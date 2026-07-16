import { useState, useEffect, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { renderMarkdown, type RenderedPost } from '@/lib/render'
import LineSidebar from '@/components/LineSidebar'
import SplitText from '@/components/SplitText'

interface ArticlePageProps {
  title: string
  date: string
  category: string
  slug: string
  content: string
  backPath?: string
  prevPost?: { slug: string; title: string }
  nextPost?: { slug: string; title: string }
}

export default function ArticlePage({ title, date, category, slug, content, backPath = '/', prevPost, nextPost }: ArticlePageProps) {
  const [rendered, setRendered] = useState<RenderedPost | null>(null)
  const [progress, setProgress] = useState(0)
  const [activeHeading, setActiveHeading] = useState<number | null>(null)
  const tocWrapperRef = useRef<HTMLDivElement>(null)
  const [tocScrollState, setTocScrollState] = useState<'top' | 'middle' | 'bottom'>('top')
  const rafRef = useRef<number | null>(null)
  const pendingProgress = useRef(0)

  const scrollToHeading = useCallback((index: number, _label: string) => {
    const el = document.getElementById(rendered?.headings[index]?.id || '')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [rendered])

  useEffect(() => {
    renderMarkdown(content).then(setRendered)
  }, [content])

  // Progress bar — throttle via rAF, only update when value changes
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      pendingProgress.current = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    const tick = () => {
      if (rafRef.current !== null) {
        setProgress(pendingProgress.current)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [])

  // TOC heading highlight — use IntersectionObserver instead of scroll polling
  useEffect(() => {
    if (!rendered?.headings.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = rendered.headings.findIndex((h) => h.id === entry.target.id)
            if (idx !== -1) setActiveHeading(idx)
          }
        }
      },
      { rootMargin: '-100px 0px -60% 0px', threshold: 0 }
    )
    for (const heading of rendered.headings) {
      const el = document.getElementById(heading.id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [rendered])

  if (!rendered) return null

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50">
        <div
          className="h-full bg-foreground transition-all duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 pt-20">
        <div className="flex gap-12">
          {/* Sidebar: TOC + Nav */}
          <aside className="hidden lg:block w-56 shrink-0">
            <nav className="sticky top-24">
              {/* Back link */}
              <Link to={backPath} className="text-sm text-muted hover:text-foreground transition-colors inline-flex items-center gap-1 mb-8">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back
              </Link>

              {/* Table of Contents */}
              {rendered.headings.length > 0 && (
                <div className="mb-8 toc-scroll-container" data-scroll-state={tocScrollState}>
                  <div className="toc-scroll-wrapper" ref={tocWrapperRef}>
                    <LineSidebar
                      items={rendered.headings.map((h) => h.text)}
                      defaultActive={activeHeading}
                      onItemClick={scrollToHeading}
                      accentColor="#000000"
                      textColor="#c4c4c4"
                      markerColor="#6c6c6c"
                      showIndex={true}
                      showMarker={true}
                      proximityRadius={100}
                      maxShift={30}
                      falloff="smooth"
                      fontSize={1.1}
                      itemGap={20}
                      smoothing={100}
                      className="[&_*]:cursor-pointer"
                    />
                  </div>
                  {rendered.headings.length > 6 && (
                    <>
                      <div className="toc-scroll-indicator toc-scroll-top" aria-hidden="true">
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                          <path d="M4 10l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="toc-scroll-indicator toc-scroll-bottom" aria-hidden="true">
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Prev/Next */}
              {(prevPost || nextPost) && (
                <div className="space-y-3">
                  {prevPost && (
                    <Link
                      to={`/posts/${prevPost.slug}`}
                      className="block text-sm text-muted hover:text-foreground transition-colors p-3 rounded-lg border border-border hover:border-gray-300"
                    >
                      <span className="text-xs uppercase tracking-wider text-muted/60">Previous</span>
                      <p className="mt-1 font-medium text-foreground truncate">{prevPost.title}</p>
                    </Link>
                  )}
                  {nextPost && (
                    <Link
                      to={`/posts/${nextPost.slug}`}
                      className="block text-sm text-muted hover:text-foreground transition-colors p-3 rounded-lg border border-border hover:border-gray-300"
                    >
                      <span className="text-xs uppercase tracking-wider text-muted/60">Next</span>
                      <p className="mt-1 font-medium text-foreground truncate">{nextPost.title}</p>
                    </Link>
                  )}
                </div>
              )}
            </nav>
          </aside>

          {/* Main Content */}
          <article className="flex-1 min-w-0">
            {/* Header */}
            <header className="mb-10 pb-10 border-b border-border">
              <SplitText
                text={title}
                className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4"
                tag="h1"
                delay={30}
                duration={0.8}
                ease="power3.out"
                from={{ opacity: 0, y: 30 }}
                to={{ opacity: 1, y: 0 }}
                textAlign="left"
              />
              <div className="flex items-center gap-3">
                <span className="text-xs font-medium uppercase tracking-wider text-muted">{category}</span>
                <span className="text-xs text-gray-400">{date}</span>
              </div>
            </header>

            {/* Article Body */}
            <div
              className="prose prose-neutral max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:leading-relaxed prose-a:text-foreground prose-a:underline prose-a:decoration-gray-300 prose-a:underline-offset-4 prose-strong:font-semibold prose-code:text-sm prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-gray-50 prose-pre:border prose-pre:border-border prose-li:mt-2 prose-table:block prose-thead:bg-gray-50 prose-th:text-left prose-th:py-2 prose-th:px-4 prose-th:border-b prose-th:border-border prose-th:font-medium prose-td:py-2 prose-td:px-4 prose-td:border-b prose-td:border-border prose-tr:last:border-0"
              dangerouslySetInnerHTML={{ __html: rendered.html }}
            />

            {/* Mobile Prev/Next */}
            {(prevPost || nextPost) && (
              <nav className="mt-16 pt-8 border-t border-border lg:hidden">
                <div className="flex flex-col gap-4">
                  {prevPost && (
                    <Link
                      to={`/posts/${prevPost.slug}`}
                      className="block p-4 rounded-lg border border-border hover:border-gray-300 transition-colors"
                    >
                      <span className="text-xs uppercase tracking-wider text-muted/60">← Previous</span>
                      <p className="mt-1 font-medium text-foreground">{prevPost.title}</p>
                    </Link>
                  )}
                  {nextPost && (
                    <Link
                      to={`/posts/${nextPost.slug}`}
                      className="block p-4 rounded-lg border border-border hover:border-gray-300 transition-colors text-right"
                    >
                      <span className="text-xs uppercase tracking-wider text-muted/60">Next →</span>
                      <p className="mt-1 font-medium text-foreground">{nextPost.title}</p>
                    </Link>
                  )}
                </div>
              </nav>
            )}
          </article>
        </div>
      </div>
    </>
  )
}
