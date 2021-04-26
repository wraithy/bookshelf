export default function ProgressBar({ percent, className }: {percent: number, className?: string}) {
  return (
    <section className={'h-4 w-full flex items-center ' + className}>
      <div className="h-full border border-base-4 rounded flex-grow">
        <div className="h-full bg-base-3" style={{ width: `${percent}%` }}></div>
      </div>
      <span className="ml-2 text-typography-secondary">
        {percent}%
      </span>
    </section>
  )
}
