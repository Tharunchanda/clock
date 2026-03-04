import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const actionClass =
  'block w-full border border-white px-5 py-2 text-center text-sm font-semibold uppercase tracking-wide transition hover:bg-white hover:text-black sm:w-auto'

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
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-xl border border-white p-5 text-center sm:p-8">
        <p className="mb-2 text-xs tracking-[0.2em] uppercase sm:text-sm sm:tracking-[0.3em]">Stop Watch</p>
        <div className="overflow-x-auto pb-1">
          <h1 className="font-mono whitespace-nowrap text-[clamp(1.6rem,10vw,3.75rem)] leading-none font-bold tracking-wide sm:tracking-widest">
            {displayValue}
          </h1>
        </div>
        <div className="mt-7 grid grid-cols-1 gap-3 sm:mt-8 sm:flex sm:flex-wrap sm:items-center sm:justify-center">
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
