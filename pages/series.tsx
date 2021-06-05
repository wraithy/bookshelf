import { Extract } from 'goodreads-export/lib/types'
import Layout from 'components/Layout'
import SeriesGroup from 'components/SeriesGroup'
import SeriesGraph from 'components/SeriesGraph'
import { reviews } from '../constants'

// assumption: we are only sorting books which have been finished
const sortByTimeline = (a: Extract, b: Extract) => (a.timeline.finished < b.timeline.finished ? 1 : -1)

function groupBySeries(reviews: Extract[]): Extract[][] {
  const groupings: { [key in symbol | string]: Extract[] } = reviews.reduce((acc, review) => {
    const key = review.book.series?.url ?? 'no-series'
    if (!acc.hasOwnProperty(key)) {
      acc[key] = []
    }
    return { ...acc, [key]: [...acc[key], review] }
  }, {})

  return (
    Object.values(groupings)
      // sort each individual grouping
      .map((grouping) => grouping.sort(sortByTimeline))
      // sort the top-level group by the most-recently-read book
      .sort((a, b) => (a[0].timeline.finished < b[0].timeline.finished ? 1 : -1))
  )
}

const groupedReviews = groupBySeries(reviews.finishedReading)

export default function Series() {
  return (
    <Layout>
      <SeriesGraph />
      {groupedReviews.map((group) => (
        <SeriesGroup key={group[0].book?.series?.url || 'no-series'} groupedReviews={group} />
      ))}
    </Layout>
  )
}
