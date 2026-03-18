import { useEffect, useRef } from 'react'

const lockTokens = new Set()
let wakeLockSentinel = null
let visibilityListenerAttached = false

function wakeLockSupported() {
  return typeof navigator !== 'undefined' && 'wakeLock' in navigator
}

async function requestWakeLockIfNeeded() {
  if (!wakeLockSupported() || lockTokens.size === 0 || wakeLockSentinel || document.visibilityState !== 'visible') {
    return
  }

  try {
    const sentinel = await navigator.wakeLock.request('screen')
    wakeLockSentinel = sentinel

    sentinel.addEventListener('release', () => {
      if (wakeLockSentinel === sentinel) {
        wakeLockSentinel = null
      }

      if (lockTokens.size > 0 && document.visibilityState === 'visible') {
        void requestWakeLockIfNeeded()
      }
    })
  } catch {
    // Ignore failures (unsupported browser state, low battery, or denied permission).
  }
}

async function releaseWakeLockIfUnused() {
  if (lockTokens.size > 0) {
    return
  }

  await releaseWakeLock()
}

async function releaseWakeLock() {
  if (!wakeLockSentinel) {
    return
  }

  const sentinel = wakeLockSentinel
  wakeLockSentinel = null

  try {
    await sentinel.release()
  } catch {
    // Ignore release errors because wake locks can be released externally.
  }
}

function ensureVisibilityListener() {
  if (visibilityListenerAttached || typeof document === 'undefined') {
    return
  }

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      void requestWakeLockIfNeeded()
      return
    }

    // Hidden pages cannot hold a wake lock and browsers may auto-release it.
    void releaseWakeLock()
  })

  visibilityListenerAttached = true
}

function useWakeLock(shouldKeepAwake) {
  const tokenRef = useRef(Symbol('wake-lock-token'))

  useEffect(() => {
    if (!wakeLockSupported()) {
      return undefined
    }

    ensureVisibilityListener()
    const token = tokenRef.current

    if (shouldKeepAwake) {
      lockTokens.add(token)
      void requestWakeLockIfNeeded()
    } else {
      lockTokens.delete(token)
      void releaseWakeLockIfUnused()
    }

    return () => {
      lockTokens.delete(token)
      void releaseWakeLockIfUnused()
    }
  }, [shouldKeepAwake])
}

export default useWakeLock
