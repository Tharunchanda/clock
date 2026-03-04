import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const actionClass =
  'border border-white px-5 py-2 text-sm font-semibold uppercase tracking-wide transition hover:bg-white hover:text-black'

function formatStopwatch(ms) {
  const totalCentiseconds = Math.floor(ms / 10)
  const centiseconds = totalCentiseconds % 100
  const totalSeconds = Math.floor(totalCentiseconds / 100)
  const seconds = totalSeconds % 60
  const totalMinutes = Math.floor(totalSeconds / 60)
  const minutes = totalMinutes % 60
  const hours = Math.floor(totalMinutes / 60)

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
    seconds,
  ).padStart(2, '0')}.${String(centiseconds).padStart(2, '0')}`
}

function StopwatchPage() {
  const [elapsedMs, setElapsedMs] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    if (!isRunning) {
      return undefined
    }

    const intervalId = setInterval(() => {
      setElapsedMs((previous) => previous + 10)
    }, 10)

    return () => clearInterval(intervalId)
  }, [isRunning])

  const displayValue = useMemo(() => formatStopwatch(elapsedMs), [elapsedMs])

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-xl border border-white p-8 text-center">
        <p className="mb-2 text-sm tracking-[0.3em] uppercase">Stop Watch</p>
        <h1 className="text-5xl font-bold tracking-widest sm:text-6xl">{displayValue}</h1>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button type="button" className={actionClass} onClick={() => setIsRunning((prev) => !prev)}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            type="button"
            className={actionClass}
            onClick={() => {
              setIsRunning(false)
              setElapsedMs(0)
            }}
          >
            Reset
          </button>
          <Link to="/" className={actionClass}>
            Back
          </Link>
        </div>
      </div>
    </main>
  )
}

export default StopwatchPage
