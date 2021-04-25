import Link from 'next/link'

export default function Layout({ children, contentClass = '' }: {children: any, contentClass?: string}) {
  return (
    <div className="w-full h-full flex">
      <nav className="h-screen w-1/4 flex flex-col flex-shrink-0">
        <Link href="/"><a>Currently reading</a></Link>
        <Link href="/books"><a>All books</a></Link>
        <Link href="/stats"><a>Stats</a></Link>
      </nav>
      <section className={'h-screen p-4 ' + contentClass}>
        {children}
      </section>
    </div>
  )
}
