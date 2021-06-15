import React, { useState } from 'react'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Nav from 'components/Nav'
import { useWindowSize } from '../util'

interface LayoutContextState {
  navOpen: boolean
  isTransitioning: boolean
}

export const LayoutContext = React.createContext<LayoutContextState>({
  navOpen: true,
  isTransitioning: false,
})

const transitionDurationMs = 150

export default function Layout({ children, contentClass = '' }: { children: any; contentClass?: string }) {
  const [navOpen, setNavOpen] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { isMobile } = useWindowSize()

  const toggleNavOpen = () => {
    setNavOpen(!navOpen)
    setIsTransitioning(true)
    setTimeout(() => setIsTransitioning(false), 150)
  }

  return (
    <div className='w-full h-full flex'>
      <Nav className={'w-56 ' + (navOpen || !isMobile ? '' : '-ml-56')} />
      {isMobile && (
        <button className={'h-32 quiet-btn flex items-center text-4xl pl-12'}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={toggleNavOpen}
            className={`transform-gpu duration-${transitionDurationMs * 2} ` + (navOpen ? 'rotate-0' : 'rotate-180')}
          />
        </button>
      )}
      <section
        className={
          `h-screen overflow-scroll transition-all duration-${transitionDurationMs} p-12 ` +
          contentClass +
          (isMobile && navOpen ? ' -mr-56' : '')
        }
      >
        <LayoutContext.Provider value={{ navOpen, isTransitioning }}>{children}</LayoutContext.Provider>
      </section>
    </div>
  )
}
