import { Extract } from 'goodreads-export/lib/types'
import ProgressBar from 'components/ProgressBar'


export default function BookHero({ extract }: {extract: Extract}) {
  const book = extract.book
  const progressDesc = extract.timeline.progress.sort((a, b) => a.date < b.date ? 1 : -1)
  return (
    <article className="rounded p-6 flex w-full h-full bg-base-2">
      <img className="rounded shadow mr-6" src={book.imageUrl}></img>
      <div className="flex flex-col">
        <header className="font-bold text-6xl overflow-ellipsis text-typography-main">
          <a href={book.url} target="_blank">{book.title}</a>
        </header>
        <p className="text-4xl mt-4">
          <span className="text-typography-secondary">by </span>
          <span className="text-typography-main">{book.author.name}</span>
        </p>
        {book.series
          ? (
            <p className="text-3xl mt-4">
              <span className="text-typography-secondary">({book.series.name} #{book.positionInSeries})</span>
            </p>
          )
          : undefined
        }
        <p className="text-xl m-auto">
          {book.description}
        </p>
        <ProgressBar percent={progressDesc[0].percent}/>
      </div>
    </article>
  )
}
