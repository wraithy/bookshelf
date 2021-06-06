// The original ResponsiveContainer is laggy when resizing the parent
// element. This fixes that issue. See the following link for more
// info:
// https://github.com/recharts/recharts/issues/1767#issuecomment-598607012
import { ResponsiveContainer as Original } from 'recharts'
import { Props } from 'recharts/types/component/ResponsiveContainer'

export default function ResponsiveContainer(props: Props) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <Original {...props} />
      </div>
    </div>
  )
}
