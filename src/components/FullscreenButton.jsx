import { useEffect, useState } from 'react'

function FullscreenButton() {
  const [isFullscreen, setIsFullscreen] = useState(Boolean(document.fullscreenElement))

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
      className="fixed right-4 top-4 z-50 border border-white bg-black px-3 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-white hover:text-black sm:right-6 sm:top-6"
    >
      {isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
    </button>
  )
}

export default FullscreenButton
