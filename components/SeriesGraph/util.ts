import { DateTime, DurationObjectUnits } from 'luxon'
import { Extract } from 'goodreads-export/lib/types'

const utc = { zone: 'utc' }

export interface DataPoint {
  yearMonth: string
  date: DateTime
  [seriesName: string]: number | string | DateTime
}

export function makeDomain(startDate: DateTime, endDate: DateTime, unit: keyof DurationObjectUnits): DateTime[] {
  let domain = []
  let cursor = startDate.startOf(unit)
  while (cursor <= endDate) {
    domain.push(cursor)
    cursor = cursor.plus({ [unit]: 1 })
  }
  return domain
}

export function pagesByMonth(
  totalPages: number,
  progress: {percent: number, date: string}[]
): { [month: string]: number } {
  const withPages = progress.map((p) => ({ ...p, pages: +(totalPages * (p.percent / 100)).toFixed(2) }), {})

  // Usually, the timeline will only include a start date at 0% and a
  // completed date at 100%. We want to spread the progress linearly over the
  // duration to avoid the entire book being counted in the month it was
  // finished.
  const startDate = DateTime.fromISO(withPages[0].date, utc)
  const endDate = DateTime.fromISO(withPages[withPages.length - 1].date, utc)
  const domain = makeDomain(startDate, endDate, 'month').map(d => d.toUTC().toISODate())
  const cumulativePages = domain.reduce((acc, date) => {
    // If there are any entries during this month, just take the one which appears last
    const yearMonth = (d: string): string => DateTime.fromISO(d, utc).toFormat('yyyy-MM')
    const thisMonth = withPages.slice().reverse().find(p => yearMonth(p.date) === yearMonth(date))
    if (thisMonth) {
      return [...acc, thisMonth.pages]
    }

    // Otherwise, interpolate...
    // If we have a timeline like the following:
    //
    // date:     t0       t1       t2
    // pages:    p0        ?       p2
    //
    // Then [?] = ((p2 - p0) / (t2 - t0)) * (t1 - t0)
    //          =   pAround  /   tAround  * tCurrent
    const previous = withPages.slice().reverse().find(p => p.date < date)
    const next = withPages.find(p => p.date > date)
    // monthDiff returns fractional months, i.e. monthDiff('2021-02-01', '2021-01-15') == ~0.5
    const monthDiff = (d2: string, d1: string): number => DateTime.fromISO(d2, utc).diff(
      DateTime.fromISO(d1, utc), ['months']
    ).months

    const pAround = next.pages - previous.pages
    const tAround = monthDiff(next.date, previous.date)
    const tCurrent = monthDiff(date, previous.date)

    return [...acc, +(pAround / tAround * tCurrent).toFixed(2)]
  }, [])

  // differentiate cumulativePages to get a count of how many pages were read within that month
  const pagesPerMonth = cumulativePages.reduce((acc, totalPages) => [
    ...acc,
    acc.length ? totalPages - acc[acc.length - 1] : totalPages
  ], [])
  return domain.reduce((acc, month, i) => ({ ...acc, [month]: pagesPerMonth[i] }), {})
}

function pagesByMonthBySeries(reviews: Extract[]): { [month: string]: { [series: string]: number } } {
  return reviews.reduce((groupings, review) => {
    const pagesPerMonthForThisReview = pagesByMonth(review.book.pageCount, review.timeline.progress)

    Object.entries(pagesPerMonthForThisReview).map(([month, pages]) => {
      if (!(month in groupings)) {
        groupings[month] = {}
      }
      const seriesName = review.book.series?.name
      if (!(seriesName in groupings[month])) {
        groupings[month][seriesName] = 0
      }

      groupings[month][seriesName] += Math.round(pages)
    })

    return groupings
  }, {})
}

// Make sure each series starts and ends with zero.
// Be careful - this mutates the input.
function connectToZero(points: DataPoint[]): DataPoint[] {
  const ensureSurroundingZeroes = (key: string, pos: number) => {
    // If the current point is already zero, we don't care about the
    // surrounding ones.
    if (points[pos][key] === 0) {return }

    for (let offset of [-1, 1]) {
      if (!(key in points[pos + offset])) { points[pos+offset][key] = 0 }
    }
  }

  for (let i = 1; i < points.length - 1; i++) {
    Object.keys(points[i]).forEach(key => ensureSurroundingZeroes(key, i))
  }
  return points
}

export function makeDataPoints(reviews: Extract[]): DataPoint[] {
  const byMonthBySeries = pagesByMonthBySeries(reviews)
  const monthsWithData = Object.keys(byMonthBySeries).sort()

  const domain = makeDomain(
    DateTime.fromISO(monthsWithData[0]),
    DateTime.fromISO(monthsWithData[monthsWithData.length - 1]),
    'month'
  )

  return connectToZero(domain.map(month => ({
    yearMonth: month.toFormat('yyyy-MM'),
    date: month,
    ...byMonthBySeries[month.toISODate()]
  })))
}
