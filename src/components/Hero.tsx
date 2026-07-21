import { useTranslation } from '@/i18n'
import SplitText from '@/components/SplitText'

export default function Hero() {
  const { t } = useTranslation()
  const handleScrollToPosts = () => {
    const el = document.getElementById('posts')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center pt-16">
      <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
        <SplitText
          text="Hylight"
          className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6"
          tag="h1"
          splitType="chars"
          delay={40}
          duration={1}
          ease="power3.out"
          from={{ opacity: 0, y: 30 }}
          to={{ opacity: 1, y: 0 }}
        />
        <SplitText
          text={t('hero_subtitle')}
          className="text-lg md:text-xl text-muted max-w-xl mx-auto leading-relaxed"
          tag="p"
          splitType="words"
          delay={30}
          duration={0.8}
          ease="power2.out"
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
        />
        <div className="mt-10">
          <button
            onClick={handleScrollToPosts}
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {t('hero_button')}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
