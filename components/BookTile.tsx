import { Book } from 'goodreads-export/lib/types'
import ExternalLink from 'components/ExternalLink'

export default function BookTile({
  book,
  grayscale = false,
  className,
}: {
  book: Book;
  grayscale?: boolean;
  className?: string;
}) {
  const primaryText = grayscale
    ? 'text-typography-dim'
    : 'text-typography-main'
  return (
    <article className={'card ' + className}>
      <ExternalLink href={book.url} className="p-2 flex h-full w-full">
        <img
          className={
            'rounded shadow mr-4 ' + (grayscale ? 'filter-grayscale' : '')
          }
          src={book.imageUrl}
          alt={book.title}
        ></img>
        <div className="flex flex-col">
          <h2
            className={`font-bold text-lg overflow-scroll no-scrollbar ${primaryText}`}
          >
            {book.title}
          </h2>
          <p>
            <span className="text-typography-secondary font-thin">by </span>
            <span className={primaryText}>{book.author.name}</span>
          </p>
          {book.series ? (
            <p className="text-sm leading-tight mt-auto">
              <span className="text-typography-secondary font-thin">
                {book.series.name} #{book.positionInSeries}
              </span>
            </p>
          ) : undefined}
        </div>
      </ExternalLink>
    </article>
  )
}
