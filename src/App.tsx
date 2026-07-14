import { BrowserRouter, Routes, Route, useParams, Link, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { Suspense, lazy, useEffect, useState, createContext, useContext } from 'react'
import Hero from '@/components/Hero'
import PostList from '@/components/PostList'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'

const ArticlePage = lazy(() => import('@/components/ArticlePage'))
const ArchivePage = lazy(() => import('@/components/ArchivePage'))
const AboutPage = lazy(() => import('@/components/AboutPage'))

interface PostWithRaw {
  slug: string
  title: string
  date: string
  category: string
  content: string
}

// History-aware back navigation context
interface NavHistoryValue {
  previousPath: string
  setPreviousPath: (path: string) => void
}

const NavHistoryContext = createContext<NavHistoryValue>({
  previousPath: '/',
  setPreviousPath: () => {},
})

export function useNavHistory() {
  return useContext(NavHistoryContext)
}

function HomePage() {
  const location = useLocation()

  useEffect(() => {
    // When navigating to home, record it as a possible back destination
    localStorage.setItem('nav-home', location.pathname)
  }, [location.pathname])

  return (
    <>
      <Hero />
      <PostList />
      <Footer />
    </>
  )
}

function ArchivePageRoute() {
  const location = useLocation()

  useEffect(() => {
    localStorage.setItem('nav-archive', location.pathname)
  }, [location.pathname])

  return (
    <Suspense fallback={null}>
      <ArchivePage />
    </Suspense>
  )
}

function AboutPageRoute() {
  const location = useLocation()

  useEffect(() => {
    localStorage.setItem('nav-about', location.pathname)
  }, [location.pathname])

  return (
    <Suspense fallback={null}>
      <AboutPage />
    </Suspense>
  )
}

// Map of all post modules — populated at module load time
const postModules = import.meta.glob('/content/posts/*.md', { eager: true })

function ArticleRoute() {
  const { slug } = useParams() as { slug: string }
  const [post, setPost] = useState<PostWithRaw | null>(null)
  const [allPosts, setAllPosts] = useState<PostWithRaw[]>([])
  const [error, setError] = useState<string | null>(null)
  const { previousPath } = useNavHistory()

  useEffect(() => {
    // Load all posts for prev/next
    const posts: PostWithRaw[] = []
    for (const [_path, m] of Object.entries(postModules)) {
      const md = m as Record<string, string>
      posts.push({ slug: md.slug, title: md.title, date: md.date, category: md.category, content: md.content })
    }
    posts.sort((a, b) => (a.date > b.date ? -1 : 1))
    setAllPosts(posts)

    // Load specific post from the pre-loaded map
    const key = `/content/posts/${slug}.md`
    const mod = (postModules as Record<string, Record<string, string>>)[key]
    if (mod) {
      setPost({ slug: mod.slug, title: mod.title, date: mod.date, category: mod.category, content: mod.content })
    } else {
      setError(`Post "${slug}" not found`)
    }
  }, [slug])

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-32 text-center">
        <h1 className="text-2xl font-bold text-foreground mb-4">Post not found</h1>
        <p className="text-muted mb-6">{error}</p>
        <BackLink to={previousPath}>Back</BackLink>
      </div>
    )
  }

  if (!post) return null

  const postIndex = allPosts.findIndex((p) => p.slug === slug)
  const prevPost = postIndex > 0 ? { slug: allPosts[postIndex - 1].slug, title: allPosts[postIndex - 1].title } : undefined
  const nextPost = postIndex < allPosts.length - 1 ? { slug: allPosts[postIndex + 1].slug, title: allPosts[postIndex + 1].title } : undefined

  return (
    <Suspense fallback={null}>
      <ArticlePage
        title={post.title}
        date={post.date}
        category={post.category}
        slug={post.slug}
        content={post.content}
        backPath={previousPath}
        prevPost={prevPost}
        nextPost={nextPost}
      />
    </Suspense>
  )
}

function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-32 text-center">
      <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
      <p className="text-muted mb-8">Page not found</p>
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Back to home
      </Link>
    </div>
  )
}

function BackLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="text-sm text-muted hover:text-foreground transition-colors inline-flex items-center gap-1">
      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {children}
    </Link>
  )
}

function NavHistoryProvider({ children }: { children: React.ReactNode }) {
  return (
    <NavHistoryContext.Provider value={{ previousPath: '/', setPreviousPath: () => {} }}>
      {children}
    </NavHistoryContext.Provider>
  )
}

function AppRoutes() {
  return (
    <PageTracker>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/archive" element={<ArchivePageRoute />} />
        <Route path="/posts/:slug" element={<ArticleRoute />} />
        <Route path="/about" element={<AboutPageRoute />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageTracker>
  )
}

export default function App() {
  return (
    <NavHistoryProvider>
      <BrowserRouter>
        <NavBar />
        <AppRoutes />
      </BrowserRouter>
    </NavHistoryProvider>
  )
}

function PageTracker({ children }: { children: React.ReactNode }) {
  const [previousPath, setPreviousPath] = useState<string>('/')
  const location = useLocation()

  useEffect(() => {
    const stored = localStorage.getItem('nav-previous')
    if (stored) setPreviousPath(stored)
  }, [])

  useEffect(() => {
    if (!location.pathname.startsWith('/posts/')) {
      localStorage.setItem('nav-previous', location.pathname)
      setPreviousPath(location.pathname)
    }
  }, [location.pathname])

  return (
    <NavHistoryContext.Provider value={{ previousPath, setPreviousPath }}>
      {children}
    </NavHistoryContext.Provider>
  )
}
