import Link from 'next/link'
import { useRouter } from 'next/router'

const NavItem = (
  { href, wrapWhenActive = false, children }: {href: string, wrapWhenActive?: boolean, children: any}
) => {
  const router = useRouter()
  const active = router.pathname === href
  let anchorClass = active
    ? 'text-4xl bold'
    : 'text-xl'

  if (!active || !wrapWhenActive) {
    anchorClass += ' whitespace-nowrap'
  }

  return (
    <Link href={href}>
      <a className={anchorClass}>
        <div className="mb-16 w-min h-32">
          {children}
          {active
            ? <hr className="mt-4 border-t-2" />
            : undefined
          }
        </div>
      </a>
    </Link>
  )
}

export default function Nav({ className = '' }: {className: string}) {
  return (
    <nav className={'flex flex-col p-4 ' + className}>
      <NavItem wrapWhenActive href="/">Currently reading</NavItem>
      <NavItem href="/books">All books</NavItem>
    </nav>
  )
}
