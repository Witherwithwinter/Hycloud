import { Link } from 'react-router-dom'
import { CardContainer, CardBody, CardItem, useMouseEnter } from '@/components/ui/3d-card'
import tutorialCover from '@/assets/covers/tutorial.svg'
import animationCover from '@/assets/covers/animation.svg'
import designCover from '@/assets/covers/design.svg'

interface PostCardProps {
  title: string
  excerpt: string
  date: string
  category: string
  slug: string
}

const COVER_MAP: Record<string, string> = {
  'getting-started-with-hylight': tutorialCover,
  'gsap-animations-react': animationCover,
  'building-minimalist-blog': designCover,
}

/** Glare / specular highlight that follows the cursor */
function Glare() {
  const { isEntered, mouseX, mouseY } = useMouseEnter()

  const cx = ((mouseX + 1) / 2) * 100
  const cy = ((mouseY + 1) / 2) * 100

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden rounded-[inherit]"
      style={{
        background: isEntered
          ? `radial-gradient(circle at ${cx}% ${cy}%, rgba(255,255,255,0.20) 0%, transparent 55%)`
          : 'transparent',
        transition: 'opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        opacity: isEntered ? 1 : 0,
      }}
    />
  )
}

export default function PostCard({ title, excerpt, date, category, slug }: PostCardProps) {
  const coverImage = COVER_MAP[slug] ?? tutorialCover

  return (
    <CardContainer containerClassName="h-full">
      <CardBody className="bg-card rounded-xl border border-card-border overflow-hidden h-full flex flex-col">
        <Link to={`/posts/${slug}`} className="relative flex flex-col h-full">

          {/* ── Specular highlight ── */}
          <Glare />

          {/* ── Cover image ── */}
          <CardItem translateZ={120} className="w-full shrink-0">
            <img src={coverImage} alt={title} className="w-full h-auto object-cover rounded-t-lg" />
          </CardItem>

          {/* ── Content ── */}
          <div className="flex flex-col flex-1 p-5 z-20">

            {/* Category + date */}
            <div className="flex items-center gap-2 mb-3">
              <CardItem translateZ={50} className="text-[11px] font-medium text-muted uppercase tracking-wider">
                {category}
              </CardItem>
              <span className="text-xs text-gray-300 select-none">·</span>
              <CardItem translateZ={50} className="text-[11px] text-gray-400">
                {date}
              </CardItem>
            </div>

            {/* Title */}
            <CardItem translateZ={90} className="mb-2 block">
              <h3 className="text-base font-semibold text-foreground decoration-gray-300 underline-offset-4 line-clamp-2">
                {title}
              </h3>
            </CardItem>

            {/* Excerpt */}
            <CardItem translateZ={70} className="block mt-auto">
              <p className="text-sm text-muted leading-relaxed line-clamp-3">
                {excerpt}
              </p>
            </CardItem>

          </div>
        </Link>
      </CardBody>
    </CardContainer>
  )
}
