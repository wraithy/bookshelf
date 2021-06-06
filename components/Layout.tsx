import { useState } from 'react'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
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
        <button className={'h-32 quiet-btn flex items-center text-4xl pl-12'}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={() => setNavOpen(!navOpen)}
            className={'transform-gpu duration-300 ' + (navOpen ? 'rotate-0' : 'rotate-180')}
          />
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
