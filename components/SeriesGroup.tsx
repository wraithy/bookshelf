import { Extract } from 'goodreads-export/lib/types'
import ExternalLink from 'components/ExternalLink'
import BookTile from 'components/BookTile'
import { seriesId } from '../util'

export default function SeriesGroup({ groupedReviews }: { groupedReviews: Extract[] }) {
  const series = groupedReviews[0].book.series
  const author = groupedReviews[0].book.author
  return (
    <section id={seriesId(series?.name)} className='flex flex-column flex-wrap w-full mb-16'>
      <header className='mb-8 w-full'>
        <h1 className='text-2xl'>
          {series ? <ExternalLink href={series.url}>{series.name}</ExternalLink> : 'No series'}
        </h1>
        {series ? (
          <h2 className='mt-2 text-md text-typography-secondary'>
            <span className='font-thin'>by </span>
            <ExternalLink href={author.url}>{author.name}</ExternalLink>
            <span className='font-thin'>
              <span className='mx-2'>•</span>
              {groupedReviews.length}/{series.works.primary}
            </span>
          </h2>
        ) : undefined}
      </header>
      <div className='flex flex-wrap w-full'>
        {groupedReviews.map((r) => (
          <div key={r.book.url} className='mr-4 mb-4'>
            <BookTile className='h-32 w-72' book={r.book} />
          </div>
        ))}
      </div>
    </section>
  )
}
