import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function ClockPage() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const time = now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  const date = now.toLocaleDateString([], {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-xl border border-white p-5 text-center sm:p-8">
        <p className="mb-2 text-xs tracking-[0.2em] uppercase sm:text-sm sm:tracking-[0.3em]">Clock</p>
        <h1 className="font-mono text-[clamp(2.2rem,14vw,4.5rem)] leading-none font-bold tracking-wide sm:tracking-widest">
          {time}
        </h1>
        <p className="mt-4 text-xs tracking-wide sm:text-sm">{date}</p>
        <Link
          to="/"
          className="mt-7 block w-full border border-white px-5 py-2 text-center text-sm font-semibold uppercase tracking-wide transition hover:bg-white hover:text-black sm:mt-8 sm:inline-block sm:w-auto"
        >
          Back
        </Link>
      </div>
    </main>
  )
}

export default ClockPage
