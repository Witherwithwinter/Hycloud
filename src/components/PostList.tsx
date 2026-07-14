import PostCard from './PostCard'

interface PostEntry {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
}

function loadPosts(): PostEntry[] {
  const modules = import.meta.glob('/content/posts/*.md', { eager: true })
  const posts: PostEntry[] = []

  for (const [_path, mod] of Object.entries(modules)) {
    const m = mod as Record<string, string>
    posts.push({
      slug: m.slug || '',
      title: m.title || '',
      excerpt: m.excerpt || '',
      date: m.date || '',
      category: m.category || 'Uncategorized',
    })
  }

  posts.sort((a, b) => (a.date > b.date ? -1 : 1))
  return posts
}

const posts = loadPosts()

export default function PostList() {
  if (posts.length === 0) {
    return (
      <section id="posts" className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold text-foreground mb-8 tracking-tight">Latest Posts</h2>
        <p className="text-muted">No posts yet.</p>
      </section>
    )
  }

  return (
    <section id="posts" className="max-w-4xl mx-auto px-6 py-16">
      <h2 className="text-2xl font-semibold text-foreground mb-8 tracking-tight">Latest Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
    </section>
  )
}
