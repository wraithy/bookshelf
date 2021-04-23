import BookTile from 'components/BookTile'
import { reviews } from '../constants'


const read = reviews
  .filter(r => !!r.timeline.finished)
  .sort((a, b) => a.timeline.finished < b.timeline.finished ? 1 : -1)

export default function Books() {
  return (
    <div className="flex flex-wrap justify-around p-4">
      {read.map(r => (
        <div key={r.book.isbn} className="p-4">
          <BookTile book={r.book} />
        </div>
      ))}
    </div>
  )
}
