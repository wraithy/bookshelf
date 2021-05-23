import Link from 'next/link'
import { useRouter } from 'next/router'

const NavItem = ({
  href,
  wrapWhenActive = false,
  children,
}: {
  href: string
  wrapWhenActive?: boolean
  children: any
}) => {
  const router = useRouter()
  const active = router.pathname === href
  let anchorClass = active ? 'text-2xl font-bold' : 'text-lg'

  if (!active || !wrapWhenActive) {
    anchorClass += ' whitespace-nowrap'
  }

  return (
    <Link href={href}>
      <a className={'h-32 flex items-center ' + anchorClass}>
        <h2 className='w-min my-auto'>
          {children}
          {active ? <hr className='mt-4 border-t-2' /> : undefined}
        </h2>
      </a>
    </Link>
  )
}

export default function Nav({ className = '' }: { className: string }) {
  return (
    <nav className={'flex flex-col px-8 ' + className}>
      <NavItem href='/'>Currently reading</NavItem>
      <NavItem href='/series'>Series</NavItem>
      {/* <NavItem href='/timeline'>Timeline</NavItem> */}
      {/* <NavItem href='/want-to-read'>Want to read</NavItem> */}
    </nav>
  )
}
