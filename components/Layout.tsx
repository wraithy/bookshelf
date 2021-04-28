import Nav from 'components/Nav'

export default function Layout({ children, contentClass = '' }: { children: any; contentClass?: string }) {
  return (
    <div className='w-full h-full flex'>
      <Nav className='h-screen w-1/4 flex-shrink-0' />
      <section className={'h-screen overflow-scroll p-4 ' + contentClass}>{children}</section>
    </div>
  )
}
