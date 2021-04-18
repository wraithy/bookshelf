import { Book } from 'goodreads-export/lib/types'

export default function BookTile({ book }: {book: Book}) {
  return (
    <article className="rounded p-2 flex w-72 h-32 bg-base-highlight">
      <img className="rounded shadow mr-4" src={book.imageUrl}></img>
      <div className="flex flex-col">
        <header className="font-bold text-lg text-typography-main">
          {book.title}
        </header>
        <p>
          <span className="text-typography-secondary">by </span>
          <span className="text-typography-main">{book.author.name}</span>
        </p>
        {book.series
          ? (
            <p className="text-sm mt-auto">
              <span className="text-typography-secondary">{book.series.name} #{book.positionInSeries}</span>
            </p>
          )
          : undefined
        }
      </div>
    </article>
  )
}
