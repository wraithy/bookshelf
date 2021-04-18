import { BookWithAuthor } from 'goodreads-export/lib/types'

export default function BookTile({ book }: {book: BookWithAuthor}) {
  return (
    <article className="p-2 flex w-72 h-32 bg-baseHighlight">
      <img className="mr-4" src={book.imageUrl}></img>
      <div className="flex-col">
        <header className="font-bold text-typography-main">
          {book.title}
        </header>
        <p>
          <span className="text-typography-secondary">by </span>
          <span className="text-typography-main">{book.author.name}</span>
        </p>
      </div>
    </article>
  )
}
