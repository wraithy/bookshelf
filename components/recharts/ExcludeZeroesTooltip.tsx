import { DefaultTooltipContent } from 'recharts/lib/component/DefaultTooltipContent'

export default function ExcludeZeroesTooltip(props: any) {
  const newProps = {
    ...props,
    payload: props.payload.filter((p: any) => p.value !== 0).map((p: any) => ({ ...p, unit: ' pages' })),
  }
  return <DefaultTooltipContent {...newProps} />
}
