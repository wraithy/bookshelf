export default function ProgressBar({ percent, className }: {percent: number, className?: string}) {
  return (
    <div className={['h-4 border-2 border-base-4 w-full', className].join(' ')}>
      <div className="h-full bg-base-3" style={{ width: `${percent}%` }}></div>
    </div>
  )
}
