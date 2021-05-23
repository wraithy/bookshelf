import Link from 'next/link'
import Layout from 'components/Layout'
import BookHero from 'components/BookHero'
import BookTile from 'components/BookTile'
import { reviews } from '../constants'

export default function Home() {
  return (
    <Layout contentClass='grid grid-cols-home grid-rows-5 gap-y-8 gap-x-4'>
      <BookHero className='col-span-5 row-span-4' extract={reviews.currentlyReading[0]} />
      <BookTile grayscale className='col-span-2' book={reviews.finishedReading[0].book} />
      <BookTile grayscale className='col-span-2' book={reviews.finishedReading[1].book} />
      <Link href='/books'>
        <a className='card flex items-center justify-center text-typography-dim '>View more</a>
      </Link>
    </Layout>
  )
}
