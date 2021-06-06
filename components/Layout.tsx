import { useState } from 'react'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Nav from 'components/Nav'
import { useWindowSize } from '../util'

export default function Layout({ children, contentClass = '' }: { children: any; contentClass?: string }) {
  const [navOpen, setNavOpen] = useState(true)
  const { isMobile } = useWindowSize()

  return (
    <div className='w-full h-full flex'>
      <Nav className={'w-56 ' + (navOpen || !isMobile ? '' : '-ml-56')} />
      {isMobile && (
        <button className={'h-32 focus:outline-none flex items-center text-4xl pl-12'}>
          <FontAwesomeIcon icon={navOpen ? faChevronLeft : faChevronRight} onClick={() => setNavOpen(!navOpen)} />
        </button>
      )}
      <section
        className={
          'h-screen overflow-scroll transition-all p-12 ' + contentClass + (isMobile && navOpen ? ' -mr-56' : '')
        }
      >
        {children}
      </section>
    </div>
  )
}
