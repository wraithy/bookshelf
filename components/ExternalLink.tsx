export default function ExternalLink({
  href,
  className = '',
  children,
}: {
  href: string;
  className?: string;
  children: any;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {children}
    </a>
  )
}
