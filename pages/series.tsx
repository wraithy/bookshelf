import { Extract } from 'goodreads-export/lib/types'
import Layout from 'components/Layout'
import BookTile from 'components/BookTile'
import SeriesGroup from 'components/SeriesGroup'
import { reviews } from '../constants'

// assumption: we are only sorting books which have been finished
const sortByTimeline = (a: Extract, b: Extract) =>
  a.timeline.finished < b.timeline.finished ? 1 : -1

const noSeriesKey = Symbol('noSeriesKey')

function groupBySeries(reviews: Extract[]): Extract[][] {
  const groupings: { [key in symbol | string]: Extract[] } = reviews.reduce(
    (acc, review) => {
      const series = review.book.series
      const key = series ? series.url : noSeriesKey
      if (!acc.hasOwnProperty(key)) {
        acc[key] = []
      }
      return { ...acc, [key]: [...acc[key], review] }
    },
    {}
  )

  return (
    Object.values(groupings)
      // sort each individual grouping
      .map((grouping) => grouping.sort(sortByTimeline))
      // sort the top-level group by the most-recently-read book
      .sort((a, b) =>
        a[0].timeline.finished < b[0].timeline.finished ? 1 : -1
      )
  )
}

const groupedReviews = groupBySeries(reviews.finishedReading)

export default function Series() {
  return (
    <Layout>
      {groupedReviews.map((group) => (
        <SeriesGroup groupedReviews={group} />
      ))}
    </Layout>
  )
}
