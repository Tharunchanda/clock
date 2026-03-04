import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ClockPage from './pages/ClockPage'
import StopwatchPage from './pages/StopwatchPage'
import TimerPage from './pages/TimerPage'
import FullscreenButton from './components/FullscreenButton'

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <FullscreenButton />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clock" element={<ClockPage />} />
        <Route path="/stopwatch" element={<StopwatchPage />} />
        <Route path="/timer" element={<TimerPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
