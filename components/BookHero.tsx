import { Extract } from 'goodreads-export/lib/types'
import ProgressBar from 'components/ProgressBar'
import ExternalLink from 'components/ExternalLink'

export default function BookHero({ extract, className }: { extract: Extract; className?: string }) {
  const book = extract.book
  const progressDesc = extract.timeline.progress.sort((a, b) => (a.date < b.date ? 1 : -1))
  return (
    <article className={'card p-14 flex w-full min-w-min h-full ' + className}>
      <img className='rounded shadow mr-14 flex-shrink-0' src={book.imageUrl} alt={book.title}></img>
      <div className='flex flex-col min-w-min'>
        <div className='overflow-scroll no-scrollbar flex flex-col flex-grow min-w-min'>
          <h1 className='font-bold text-6xl overflow-ellipsis text-typography-main'>
            <ExternalLink href={book.url} className='min-w-min'>
              {book.title}
            </ExternalLink>
          </h1>
          <p className='text-4xl mt-4'>
            <span className='text-typography-secondary font-thin'>by </span>
            <span className='text-typography-main'>{book.author.name}</span>
          </p>
          {book.series ? (
            <p className='text-3xl mt-4'>
              <span className='text-typography-secondary font-thin'>
                ({book.series.name} #{book.positionInSeries})
              </span>
            </p>
          ) : undefined}
          <p className='text-xl m-auto py-4 whitespace-pre-line'>{book.description}</p>
        </div>
        <ProgressBar className='mt-2' percent={progressDesc[0].percent} />
      </div>
    </article>
  )
}
