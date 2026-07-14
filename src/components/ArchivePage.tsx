import SplitText from '@/components/SplitText'
import LineSidebar from '@/components/LineSidebar'

interface PostEntry {
  slug: string
  title: string
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
      date: m.date || '',
      category: m.category || 'Uncategorized',
    })
  }

  posts.sort((a, b) => (a.date > b.date ? -1 : 1))
  return posts
}

const posts = loadPosts()

export default function ArchivePage() {
  const sidebarItems = posts.map((p) => ({
    label: p.title,
    date: p.date,
    slug: p.slug,
  }))

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16 pt-20">
      <SplitText
        text="Archive"
        className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-12"
        tag="h1"
        delay={40}
        duration={1}
        ease="power3.out"
        from={{ opacity: 0, y: 30 }}
        to={{ opacity: 1, y: 0 }}
        textAlign="center"
      />

      <div className="flex justify-center w-full max-w-2xl">
        <LineSidebar
          items={sidebarItems.map((item) => item.label)}
          accentColor="#000000"
          textColor="#c4c4c4"
          markerColor="#6c6c6c"
          showIndex={true}
          showMarker={true}
          proximityRadius={100}
          maxShift={60}
          falloff="smooth"
          markerLength={60}
          markerGap={0}
          tickScale={0.5}
          scaleTick={true}
          itemGap={20}
          fontSize={1.1}
          smoothing={100}
          onItemClick={(index) => {
            const slug = sidebarItems[index]?.slug
            if (slug) {
              window.location.href = `/posts/${slug}`
            }
          }}
          className="[&_*]:cursor-pointer"
        />
      </div>
    </div>
  )
}
