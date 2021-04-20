import BookHero from 'components/BookHero'
import { reviews } from '../constants'

export default function Home() {
  return (
    <div className="flex flex-wrap justify-around p-4">
      <BookHero extract={reviews[4]} />
    </div>
  )
}
