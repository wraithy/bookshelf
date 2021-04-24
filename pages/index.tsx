import BookHero from 'components/BookHero'
import BookTile from 'components/BookTile'
import { reviews } from '../constants'

export default function Home() {
  return (
    <div className="h-screen w-screen p-4 grid grid-cols-5 grid-rows-5 gap-4">
      <BookHero className="col-span-5 row-span-4" extract={reviews.finishedReading[0]} />
      <BookTile grayscale className="col-span-2" book={reviews.finishedReading[1].book} />
      <BookTile grayscale className="col-span-2" book={reviews.finishedReading[2].book} />
      <a className="bg-base-2 rounded flex items-center justify-center">
        <span>View more</span>
      </a>
    </div>
  )
}
