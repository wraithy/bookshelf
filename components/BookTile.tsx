import { Book } from 'goodreads-export/lib/types'
import { truncate } from '../util'


export default function BookTile({ book }: {book: Book}) {
  return (
    <a href={book.url} target="_blank">
      <article className="rounded p-2 flex w-72 h-32 bg-base-highlight">
        <img className="rounded shadow mr-4" src={book.imageUrl}></img>
        <div className="flex flex-col">
          <header className="font-bold text-lg overflow-ellipsis text-typography-main">
            {truncate(book.title, 50)}
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
      </article>
    </a>
  )
}
