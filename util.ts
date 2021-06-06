import { useState, useEffect } from 'react'

export const seriesId = (seriesName: string) => (seriesName ? seriesName.replace(/\ /g, '-') : 'no-series')

interface Size {
  width: number | undefined;
  height: number | undefined;
  isMobile: boolean | undefined;
}
// https://usehooks.com/useWindowSize/
export function useWindowSize(): Size {
  const [windowSize, setWindowSize] = useState<Size>({
    width: undefined,
    height: undefined,
    isMobile: undefined,
  })
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobile: window.innerWidth < 768,
      })
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, []) // Empty array ensures that effect is only run on mount
  return windowSize
}
