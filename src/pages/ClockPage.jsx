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
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-xl border border-white p-8 text-center">
        <p className="mb-2 text-sm tracking-[0.3em] uppercase">Clock</p>
        <h1 className="text-6xl font-bold tracking-widest sm:text-7xl">{time}</h1>
        <p className="mt-4 text-sm tracking-wide">{date}</p>
        <Link
          to="/"
          className="mt-8 inline-block border border-white px-5 py-2 text-sm font-semibold uppercase tracking-wide transition hover:bg-white hover:text-black"
        >
          Back
        </Link>
      </div>
    </main>
  )
}

export default ClockPage
