import NavItem from 'components/NavItem'

export default function Nav({ className = '' }: { className: string }) {
  return (
    <nav className={'flex flex-col pl-8 transition-all h-screen flex-shrink-0 ' + className}>
      <NavItem href='/'>Currently reading</NavItem>
      <NavItem href='/series'>Series</NavItem>
    </nav>
  )
}
