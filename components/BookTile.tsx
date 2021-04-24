import { Book } from 'goodreads-export/lib/types'

export default function BookTile(
  { book, grayscale = false, className }: {book: Book, grayscale?: boolean, className?: string}
) {
  return (
    <article className={'rounded bg-base-2 ' + className}>
      <a href={book.url} target="_blank" className="p-2 flex h-full w-full">
        <img className={'rounded shadow mr-4 ' + (grayscale ? 'filter-grayscale' : '')} src={book.imageUrl}></img>
        <div className="flex flex-col">
          <header className="font-bold text-typography-main text-lg overflow-scroll">
            {book.title}
          </header>
          <p>
            <span className="text-typography-secondary">by </span>
            <span className="text-typography-main">{book.author.name}</span>
          </p>
          {book.series
            ? (
              <p className="text-sm leading-tight mt-auto">
                <span className="text-typography-secondary">{book.series.name} #{book.positionInSeries}</span>
              </p>
            )
            : undefined
          }
        </div>
      </a>
    </article>
  )
}
