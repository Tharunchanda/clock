import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import useWakeLock from '../hooks/useWakeLock'

const actionClass =
  'block w-full border border-white px-5 py-2 text-center text-sm font-semibold uppercase tracking-wide transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto'

function formatTimer(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
    seconds,
  ).padStart(2, '0')}`
}

function TimerPage() {
  const [minutesInput, setMinutesInput] = useState('1')
  const [secondsInput, setSecondsInput] = useState('0')
  const [configuredSeconds, setConfiguredSeconds] = useState(60)
  const [remainingSeconds, setRemainingSeconds] = useState(60)
  const [isRunning, setIsRunning] = useState(false)

  useWakeLock(isRunning)

  useEffect(() => {
    if (!isRunning || remainingSeconds <= 0) {
      return undefined
    }

    const intervalId = setInterval(() => {
      setRemainingSeconds((previous) => {
        if (previous <= 1) {
          setIsRunning(false)
          return 0
        }

        return previous - 1
      })
    }, 1000)

    return () => clearInterval(intervalId)
  }, [isRunning, remainingSeconds])

  const displayValue = useMemo(() => formatTimer(remainingSeconds), [remainingSeconds])

  const setTimerFromInput = () => {
    const minutes = Math.max(0, Number.parseInt(minutesInput || '0', 10) || 0)
    const seconds = Math.min(59, Math.max(0, Number.parseInt(secondsInput || '0', 10) || 0))
    const total = minutes * 60 + seconds

    setConfiguredSeconds(total)
    setRemainingSeconds(total)
    setIsRunning(false)
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-xl border border-white p-5 text-center sm:p-8">
        <p className="mb-2 text-xs tracking-[0.2em] uppercase sm:text-sm sm:tracking-[0.3em]">Timer</p>
        <h1 className="font-mono text-[clamp(1.9rem,12vw,3.75rem)] leading-none font-bold tracking-wide sm:tracking-widest">
          {displayValue}
        </h1>

        <div className="mx-auto mt-7 w-full max-w-xs sm:mt-8">
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              value={minutesInput}
              onChange={(event) => setMinutesInput(event.target.value)}
              className="w-1/2 border border-white bg-black px-3 py-2 text-center text-white outline-none"
              placeholder="MM"
            />
            <span className="text-lg">:</span>
            <input
              type="number"
              min="0"
              max="59"
              value={secondsInput}
              onChange={(event) => setSecondsInput(event.target.value)}
              className="w-1/2 border border-white bg-black px-3 py-2 text-center text-white outline-none"
              placeholder="SS"
            />
          </div>
          <button type="button" className="mt-3 w-full border border-white px-5 py-2 text-center text-sm font-semibold uppercase tracking-wide transition hover:bg-white hover:text-black" onClick={setTimerFromInput}>
            Set
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center">
          <button
            type="button"
            className={actionClass}
            disabled={remainingSeconds === 0}
            onClick={() => setIsRunning((previous) => !previous)}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            type="button"
            className={actionClass}
            onClick={() => {
              setIsRunning(false)
              setRemainingSeconds(configuredSeconds)
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

export default TimerPage
