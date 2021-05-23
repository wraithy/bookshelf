import { DateTime } from 'luxon'
import { makeDomain, pagesByMonth } from './util'

describe('makeDomain', () => {
  const expected = {
    monthly: [ // 2021-01-01 to 2021-05-01
      DateTime.fromISO('2021-01-01'),
      DateTime.fromISO('2021-02-01'),
      DateTime.fromISO('2021-03-01'),
      DateTime.fromISO('2021-04-01'),
      DateTime.fromISO('2021-05-01'),
    ],
    daily: [ // 2021-01-25 to 2021-02-05
      DateTime.fromISO('2021-01-25'),
      DateTime.fromISO('2021-01-26'),
      DateTime.fromISO('2021-01-27'),
      DateTime.fromISO('2021-01-28'),
      DateTime.fromISO('2021-01-29'),
      DateTime.fromISO('2021-01-30'),
      DateTime.fromISO('2021-01-31'),
      DateTime.fromISO('2021-02-01'),
      DateTime.fromISO('2021-02-02'),
      DateTime.fromISO('2021-02-03'),
      DateTime.fromISO('2021-02-04'),
      DateTime.fromISO('2021-02-05'),
    ]
  }

  describe('monthly', () => {
    test.each([
      ['start of month', DateTime.fromISO('2021-01-01'), DateTime.fromISO('2021-05-01')],
      ['mid month', DateTime.fromISO('2021-01-15'), DateTime.fromISO('2021-05-15')],
      ['end of month', DateTime.fromISO('2021-01-31'), DateTime.fromISO('2021-05-31')],
    ])('%s boundaries', (_, start, end) => {
      expect(makeDomain(start, end, 'month')).toEqual(expected.monthly)
    })
  })

  test('daily', () => {
    expect(makeDomain(
      DateTime.fromISO('2021-01-25'),
      DateTime.fromISO('2021-02-05'),
      'day'
    )).toEqual(expected.daily)
  })
})

describe('pagesByMonth', () => {
  test('simple', () => {
    expect(pagesByMonth(100, [
      { date: '2021-01-01', percent: 0 },
      { date: '2021-03-01', percent: 100 },
    ])).toEqual({
      '2021-01-01': 0,
      '2021-02-01': 50,
      '2021-03-01': 50,
    })
  })

  test('complex', () => {
    expect(pagesByMonth(100, [
      { date: '2021-01-15', percent: 0 },
      { date: '2021-03-15', percent: 100 },
    ])).toEqual({
      '2021-01-01': 0,
      // the interpolation would put page 50 on 2021-02-15
      '2021-02-01': 27.42,
      '2021-03-01': 72.58,
    })
  })
})
