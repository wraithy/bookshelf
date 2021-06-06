import { useState } from 'react'
import { AreaChart, XAxis, Tooltip, Area } from 'recharts'
import ExcludeZeroesTooltip from 'components/recharts/ExcludeZeroesTooltip'
import ResponsiveContainer from 'components/recharts/ResponsiveContainer'
import { reviews, accentColors } from '../../constants'
import { makeDataPoints, clipToPeriod, scrollToSeries } from './util'
import { seriesId } from '../../util'
import styles from './styles.module.css'

const allDataPoints = makeDataPoints(reviews.finishedReading)
const allSeriesNames = [...new Set(reviews.finishedReading.map((r) => r.book.series?.name))]

const colorWheel = accentColors(400)
const getAreaColor = (i: number) => colorWheel[i % colorWheel.length]

const periods = {
  '1Y': 1,
  '5Y': 5,
  '10Y': 10,
  ALL: null,
}

export default function SeriesGraph() {
  const [selectedPeriod, setPeriod] = useState(periods['5Y'])
  const points = clipToPeriod(allDataPoints, selectedPeriod)

  return (
    <article className='h-48 mb-16 w-full'>
      <ResponsiveContainer debounce={200}>
        <AreaChart data={points} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <defs>
            {allSeriesNames.map((seriesName, i) => (
              <linearGradient id={`${seriesId(seriesName)}-gradient`} key={i} x1='0' y1='0' x2='0' y2='1'>
                <stop offset='10%' stopColor={getAreaColor(i)} stopOpacity={1} />
                <stop offset='100%' stopColor={getAreaColor(i)} stopOpacity={0} />
              </linearGradient>
            ))}
          </defs>
          <XAxis
            dataKey='yearMonth'
            axisLine={false}
            tickLine={false}
            allowDataOverflow={false}
            minTickGap={100}
            tickFormatter={(value: string) => value.split('-')[0]}
          />
          <Tooltip content={ExcludeZeroesTooltip} wrapperClassName='card' />
          {allSeriesNames.map((seriesName, i) => (
            <Area
              key={i}
              type='monotone'
              dataKey={seriesName}
              stroke={getAreaColor(i)}
              fillOpacity={1}
              fill={`url(#${seriesId(seriesName)}-gradient)`}
              isAnimationActive={false}
              onClick={() => scrollToSeries(seriesName)}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
      <div className={styles['period-select']}>
        {Object.entries(periods).map(([key, value]) => (
          <button
            key={key}
            onClick={() => setPeriod(value)}
            className={'quiet-btn font-thin ' + (value === selectedPeriod ? styles.selected : '')}
          >
            {key}
          </button>
        ))}
      </div>
    </article>
  )
}
