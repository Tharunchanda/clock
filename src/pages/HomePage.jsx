import { Link } from 'react-router-dom'

const buttonClass =
  'w-full border border-white px-6 py-3 text-lg font-semibold uppercase tracking-wide transition hover:bg-white hover:text-black'

function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md border border-white p-8 text-center">
        <h1 className="mb-8 text-4xl font-bold tracking-[0.2em] uppercase">Home</h1>
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
