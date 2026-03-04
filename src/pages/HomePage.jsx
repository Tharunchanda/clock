import { Link } from 'react-router-dom'

const buttonClass =
  'block w-full border border-white px-5 py-2.5 text-base font-semibold uppercase tracking-wide transition hover:bg-white hover:text-black sm:px-6 sm:py-3 sm:text-lg'

function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md border border-white p-6 text-center sm:p-8">
        <h1 className="mb-6 text-3xl font-bold tracking-[0.15em] uppercase sm:mb-8 sm:text-4xl sm:tracking-[0.2em]">
          Home
        </h1>
        <div className="space-y-4">
          <Link to="/clock" className={buttonClass}>
            Clock
          </Link>
          <Link to="/stopwatch" className={buttonClass}>
            Stop Watch
          </Link>
          <Link to="/timer" className={buttonClass}>
            Timer
          </Link>
        </div>
      </div>
    </main>
  )
}

export default HomePage
