import { useState } from 'react'
import { AreaChart, XAxis, Tooltip, Area, ResponsiveContainer } from 'recharts'
import { DefaultTooltipContent } from 'recharts/lib/component/DefaultTooltipContent'
import { reviews, accentColors } from '../../constants'
import { DataPoint, makeDataPoints } from './util'
import { seriesId } from '../../util'
import styles from './styles.module.css'

const allDataPoints = makeDataPoints(reviews.finishedReading)
const allSeriesNames = [...new Set(reviews.finishedReading.map((r) => r.book.series?.name))]

const colorWheel = accentColors(400)
const getAreaColor = (i: number) => colorWheel[i % colorWheel.length]

const ExcludeZeroesTooltip = (props: any) => {
  const newProps = {
    ...props,
    payload: props.payload.filter((p: any) => p.value !== 0).map((p: any) => ({ ...p, unit: ' pages' })),
  }
  return <DefaultTooltipContent {...newProps} />
}

const periods = {
  '1Y': 1,
  '5Y': 5,
  '10Y': 10,
  ALL: null,
}

function clipToPeriod(points: DataPoint[], years: number | null): DataPoint[] {
  if (years === null) {
    return points
  }
  const cutoff = points[points.length - 1].date.minus({ years })
  let clipped = points.filter((p) => p.date >= cutoff)
  // we want the first point to be one that actually has values
  const hasValues = (p: DataPoint) => Object.keys(p).length > ['date', 'yearMonth'].length
  while (clipped.length && !hasValues(clipped[0])) {
    clipped.shift()
  }
  return clipped
}

function scrollToSeries(seriesName: string) {
  const elem = document.getElementById(seriesId(seriesName))
  elem.scrollIntoView({ behavior: 'smooth' })
}

export default function SeriesGraph() {
  const [selectedPeriod, setPeriod] = useState(periods['5Y'])
  const points = clipToPeriod(allDataPoints, selectedPeriod)

  return (
    <article className='h-48 mb-16 w-full'>
      <ResponsiveContainer>
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
            className={value === selectedPeriod ? styles.selected : ''}
          >
            {key}
          </button>
        ))}
      </div>
    </article>
  )
}
