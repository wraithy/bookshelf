import { Book } from 'goodreads-export/lib/types'

export default function BookTile(
  { book, grayscale = false, className }: {book: Book, grayscale?: boolean, className?: string}
) {
  const primaryText = grayscale ? 'text-typography-dim' : 'text-typography-main'
  return (
    <article className={'card ' + className}>
      <a href={book.url} target="_blank" className="p-2 flex h-full w-full">
        <img className={'rounded shadow mr-4 ' + (grayscale ? 'filter-grayscale' : '')} src={book.imageUrl}></img>
        <div className="flex flex-col">
          <header className={`font-bold text-lg overflow-scroll ${primaryText}`}>
            {book.title}
          </header>
          <p>
            <span className="text-typography-secondary font-thin">by </span>
            <span className={primaryText}>{book.author.name}</span>
          </p>
          {book.series
            ? (
              <p className="text-sm leading-tight mt-auto">
                <span className="text-typography-secondary font-thin">{book.series.name} #{book.positionInSeries}</span>
              </p>
            )
            : undefined
          }
        </div>
      </a>
    </article>
  )
}
