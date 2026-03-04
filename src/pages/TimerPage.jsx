import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const actionClass =
  'border border-white px-5 py-2 text-sm font-semibold uppercase tracking-wide transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-40'

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
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-xl border border-white p-8 text-center">
        <p className="mb-2 text-sm tracking-[0.3em] uppercase">Timer</p>
        <h1 className="text-5xl font-bold tracking-widest sm:text-6xl">{displayValue}</h1>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <input
            type="number"
            min="0"
            value={minutesInput}
            onChange={(event) => setMinutesInput(event.target.value)}
            className="w-24 border border-white bg-black px-3 py-2 text-center text-white outline-none"
            placeholder="MM"
          />
          <span className="text-xl">:</span>
          <input
            type="number"
            min="0"
            max="59"
            value={secondsInput}
            onChange={(event) => setSecondsInput(event.target.value)}
            className="w-24 border border-white bg-black px-3 py-2 text-center text-white outline-none"
            placeholder="SS"
          />
          <button type="button" className={actionClass} onClick={setTimerFromInput}>
            Set
          </button>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
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
