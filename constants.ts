import { Extract } from 'goodreads-export/lib/types'
import { default as rawReviews } from 'reviews.json'

export const reviews = rawReviews as Extract[]
