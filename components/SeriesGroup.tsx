import { Extract } from 'goodreads-export/lib/types'
import ExternalLink from 'components/ExternalLink'
import BookTile from 'components/BookTile'

export default function SeriesGroup({
  groupedReviews,
}: {
  groupedReviews: Extract[];
}) {
  const series = groupedReviews[0].book.series
  const author = groupedReviews[0].book.author
  return (
    <section className="flex flex-column flex-wrap w-full mb-16">
      <header className="mb-8 w-full">
        <h1>
          <ExternalLink href={series.url} className="text-2xl">
            {series.name}
          </ExternalLink>
        </h1>
        <h2 className="mt-2 text-md text-typography-secondary">
          <span className="font-thin">by </span>
          <ExternalLink href={author.url}>{author.name}</ExternalLink>
          <span className="font-thin">
            <span className="mx-2">•</span>
            {groupedReviews.length}/{series.works.primary}
          </span>
        </h2>
      </header>
      <div className="flex flex-wrap w-full">
        {groupedReviews.map((r) => (
          <div key={r.book.isbn} className="mr-4 mb-4">
            <BookTile className="h-32 w-72" book={r.book} />
          </div>
        ))}
      </div>
    </section>
  )
}
