import colors from 'tailwindcss/colors'
import { Extract } from 'goodreads-export/lib/types'
import { default as rawReviews } from 'reviews.json'

const all = rawReviews as Extract[]

const finishedReading = all
  .filter(r => !!r.timeline.finished)
  .sort((a, b) => a.timeline.finished < b.timeline.finished ? 1 : -1)

const currentlyReading = all
  .filter(r => r.timeline.started && !r.timeline.finished)
  .sort((a, b) => a.timeline.started < b.timeline.started ? 1 : -1)

export const reviews = {
  all,
  finishedReading,
  currentlyReading,
}

export const accentColors = (brightness: number) => [
  'red',
  'yellow',
  'green',
  'blue',
  'indigo',
  'purple',
  'pink',
].map(c => colors[c][brightness])
