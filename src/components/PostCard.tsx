import { Link } from 'react-router-dom'

interface PostCardProps {
  title: string
  excerpt: string
  date: string
  category: string
  slug: string
}

export default function PostCard({ title, excerpt, date, category, slug }: PostCardProps) {
  return (
    <Link
      to={`/posts/${slug}`}
      className="group block p-6 bg-card rounded-lg border border-card-border hover:border-gray-300 transition-colors"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-xs font-medium text-muted uppercase tracking-wider">{category}</span>
        <span className="text-xs text-gray-400">·</span>
        <span className="text-xs text-gray-400">{date}</span>
      </div>
      <h3 className="text-lg font-semibold text-foreground group-hover:underline decoration-gray-300 underline-offset-4">
        {title}
      </h3>
      <p className="text-sm text-muted mt-2 leading-relaxed">{excerpt}</p>
    </Link>
  )
}
