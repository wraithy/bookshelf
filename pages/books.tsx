import Layout from 'components/Layout'
import BookTile from 'components/BookTile'
import { reviews } from '../constants'

export default function Books() {
  return (
    <Layout contentClass='flex flex-wrap'>
      {reviews.finishedReading.map((r) => (
        <div key={r.book.isbn} className='mr-4 mb-4'>
          <BookTile className='h-32 w-72' book={r.book} />
        </div>
      ))}
    </Layout>
  )
}
