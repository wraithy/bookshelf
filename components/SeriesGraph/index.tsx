import { AreaChart, XAxis, YAxis, Tooltip, Area, ResponsiveContainer } from 'recharts'
import { DefaultTooltipContent } from 'recharts/lib/component/DefaultTooltipContent'
import { reviews, accentColors } from '../../constants'
import { makeDataPoints } from './util'

const dataPoints = makeDataPoints(reviews.finishedReading)
const allSeriesNames = [...new Set(reviews.finishedReading.map((r) => r.book.series?.name))]
const id = (seriesName: string) => (seriesName ? seriesName.replace(/\ /g, '-') : '')

const colorWheel = accentColors(400)
const getAreaColor = (i: number) => colorWheel[i % colorWheel.length]

const ExcludeZeroesTooltip = (props: any) => {
  const newProps = {
    ...props,
    payload: props.payload.filter((p: any) => p.value !== 0).map((p: any) => ({ ...p, unit: ' pages' })),
  }
  return <DefaultTooltipContent {...newProps} />
}

export default function SeriesGraph() {
  return (
    <>
      <h1 className='mb-4 text-2xl'>Timeline</h1>
      <article className='card h-36 p-2 mb-16'>
        <ResponsiveContainer>
          <AreaChart width={730} height={250} data={dataPoints} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              {allSeriesNames.map((seriesName, i) => (
                <linearGradient id={id(seriesName)} key={i} x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor={getAreaColor(i)} stopOpacity={0.8} />
                  <stop offset='95%' stopColor={getAreaColor(i)} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <XAxis
              dataKey='yearMonth'
              allowDataOverflow={false}
              minTickGap={100}
              tickFormatter={(value: string) => value.split('-')[0]}
            />
            <Tooltip content={ExcludeZeroesTooltip} />
            {allSeriesNames.map((seriesName, i) => (
              <Area
                key={i}
                type='monotone'
                connectNulls
                dataKey={seriesName}
                stroke={getAreaColor(i)}
                fillOpacity={1}
                fill={`url(#${id(seriesName)})`}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </article>
    </>
  )
}
