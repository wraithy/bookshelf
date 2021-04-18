import BookTile from 'components/BookTile'
import { reviews } from '../constants'

export default function Home() {
  return (
    <div className="flex flex-wrap justify-around">
      {reviews.slice(0, 20).map(r => (
        <div className="m-4">
          <BookTile book={r.book}/>
        </div>
      ))}
    </div>
  )
}
