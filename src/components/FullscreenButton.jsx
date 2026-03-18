import { useEffect, useState } from 'react'
import useWakeLock from '../hooks/useWakeLock'

function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(Boolean(document.fullscreenElement))
  const label = isFullscreen ? 'Exit full screen' : 'Enter full screen'

  useWakeLock(isFullscreen)

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen()
      return
    }

    await document.documentElement.requestFullscreen()
  }

  return (
    <button
      type="button"
      onClick={toggleFullscreen}
      aria-label={label}
      title={label}
      className="fixed right-4 top-4 z-50 flex h-10 w-10 items-center justify-center border border-white bg-black text-white transition hover:bg-white hover:text-black sm:right-6 sm:top-6"
    >
      {isFullscreen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
        >
          <path d="M9 3H5v4" />
          <path d="M15 3h4v4" />
          <path d="M9 21H5v-4" />
          <path d="M15 21h4v-4" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
        >
          <path d="M9 3H3v6" />
          <path d="M15 3h6v6" />
          <path d="M9 21H3v-6" />
          <path d="M15 21h6v-6" />
        </svg>
      )}
    </button>
  )
}

export default FullscreenButton
