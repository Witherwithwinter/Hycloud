import { useRef, useEffect } from 'react'

interface CanvasCoverProps {
  title: string
  category: string
  slug: string
}

/** Color palette definition */
interface Palette {
  bg: string
  accent: string
  accentLight: string
  overlay: string
}

/** Category → palette mapping */
const PALETTES: Record<string, Palette> = {
  Design: {
    bg: '#fef2f2',
    accent: '#e11d48',
    accentLight: '#fda4af',
    overlay: 'rgba(255,255,255,0.72)',
  },
  Tutorial: {
    bg: '#eff6ff',
    accent: '#2563eb',
    accentLight: '#93c5fd',
    overlay: 'rgba(255,255,255,0.72)',
  },
  Guide: {
    bg: '#f0fdf4',
    accent: '#16a34a',
    accentLight: '#86efac',
    overlay: 'rgba(255,255,255,0.72)',
  },
  'Web Dev': {
    bg: '#faf5ff',
    accent: '#9333ea',
    accentLight: '#d8b4fe',
    overlay: 'rgba(255,255,255,0.72)',
  },
  Frontend: {
    bg: '#fefce8',
    accent: '#ca8a04',
    accentLight: '#fde68a',
    overlay: 'rgba(255,255,255,0.72)',
  },
}

const DEFAULT_PALETTE: Palette = {
  bg: '#f8fafc',
  accent: '#0f172a',
  accentLight: '#cbd5e1',
  overlay: 'rgba(255,255,255,0.72)',
}

/** Deterministic hash from string */
function hashStr(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

// ── Pattern drawing functions ──────────────────────────────

function drawOrbs(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  seed: number,
  p: Palette
) {
  const positions = [0.2, 0.5, 0.8]
  positions.forEach((px, i) => {
    const py = 0.3 + 0.15 * ((seed + i * 13) % 5)
    const r = w * (0.22 + 0.08 * ((seed + i * 7) % 4))
    ctx.beginPath()
    ctx.arc(w * px, h * py, r, 0, Math.PI * 2)
    ctx.fillStyle = p.accentLight
    ctx.globalAlpha = 0.28 + 0.1 * ((seed + i * 3) % 3)
    ctx.fill()
  })
  ctx.globalAlpha = 1
}

function drawMesh(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  seed: number,
  p: Palette
) {
  const gap = 24 + (seed % 16)
  ctx.strokeStyle = p.accentLight
  ctx.lineWidth = 1
  ctx.globalAlpha = 0.4
  for (let x = 0; x < w; x += gap) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x + h * 0.6, h)
    ctx.stroke()
  }
  for (let y = 0; y < h; y += gap) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(w, y + w * 0.25)
    ctx.stroke()
  }
  ctx.globalAlpha = 1
}

function drawWaves(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  seed: number,
  p: Palette
) {
  const count = 3 + (seed % 3)
  for (let j = 0; j < count; j++) {
    ctx.beginPath()
    const yBase = (h / (count + 1)) * (j + 1)
    const amp = 18 + (seed + j * 7) % 22
    ctx.moveTo(0, yBase)
    for (let x = 0; x <= w; x += 2) {
      ctx.lineTo(
        x,
        yBase + Math.sin((x / w) * Math.PI * (2 + j) + seed * 0.01) * amp
      )
    }
    ctx.strokeStyle = j === 0 ? p.accent : p.accentLight
    ctx.globalAlpha = 0.5 - j * 0.12
    ctx.lineWidth = 1.5
    ctx.stroke()
  }
  ctx.globalAlpha = 1
}

function drawBlocks(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  seed: number,
  p: Palette
) {
  const count = 4 + (seed % 3)
  for (let i = 0; i < count; i++) {
    ctx.save()
    const cx = w * (0.15 + 0.18 * ((seed + i * 11) % 4))
    const cy = h * (0.1 + 0.2 * ((seed + i * 7) % 4))
    ctx.translate(cx, cy)
    ctx.rotate(((seed * 7 + i * 41) % 180) * (Math.PI / 180))
    ctx.fillStyle = i % 2 === 0 ? p.accent : p.accentLight
    ctx.globalAlpha = 0.18
    const bw = w * (0.35 + 0.1 * (i % 3))
    const bh = h * (0.25 + 0.1 * ((seed + i) % 3))
    ctx.fillRect(-bw / 2, -bh / 2, bw, bh)
    ctx.restore()
  }
  ctx.globalAlpha = 1
}

function drawDots(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  seed: number,
  p: Palette
) {
  const cols = 10 + (seed % 6)
  const rows = Math.floor(cols * (h / w))
  const gapX = w / cols
  const gapY = h / rows
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = gapX * (col + 0.5) + ((seed * (row + 1) + col * 3) % 7) * 2
      const y = gapY * (row + 0.5) + ((seed * (col + 1) + row * 5) % 7) * 2
      const r = 2 + ((seed + row * cols + col) % 6)
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fillStyle = (row + col) % 3 === 0 ? p.accent : p.accentLight
      ctx.globalAlpha = 0.3 + 0.15 * ((seed + row + col) % 4)
      ctx.fill()
    }
  }
  ctx.globalAlpha = 1
}

const PATTERNS = [drawOrbs, drawMesh, drawWaves, drawBlocks, drawDots]

// ── Component ──────────────────────────────────────────────

export default function CanvasCover({ title, category, slug }: CanvasCoverProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const palette = PALETTES[category] ?? DEFAULT_PALETTE

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    let raf = 0

    const draw = () => {
      const rect = container.getBoundingClientRect()
      if (rect.width === 0) {
        raf = requestAnimationFrame(draw)
        return
      }

      const w = rect.width
      const h = rect.width * 0.5
      const dpr = window.devicePixelRatio || 1

      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`

      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.scale(dpr, dpr)

      // ── Background ──
      ctx.fillStyle = palette.bg
      ctx.fillRect(0, 0, w, h)

      // ── Procedural pattern ──
      const seed = hashStr(slug)
      const patternFn = PATTERNS[seed % PATTERNS.length]
      patternFn(ctx, w, h, seed, palette)

      // ── Title overlay strip ──
      const stripH = 56
      const stripY = h - stripH
      ctx.fillStyle = palette.overlay
      ctx.fillRect(0, stripY, w, stripH)

      // Fade line above the strip
      const grad = ctx.createLinearGradient(0, stripY - 2, 0, stripY + 2)
      grad.addColorStop(0, 'transparent')
      grad.addColorStop(0.5, palette.accentLight)
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(0, stripY - 2, w, 4)

      // ── Title text ──
      const maxWidth = w - 32
      const fontSize = Math.max(14, Math.min(18, w / 28))
      ctx.font = `600 ${fontSize}px "Inter", "PingFang SC", "Microsoft YaHei", sans-serif`
      ctx.fillStyle = '#1e293b'
      ctx.textBaseline = 'middle'

      // Truncate text that overflows
      let displayTitle = title
      while (ctx.measureText(displayTitle).width > maxWidth && displayTitle.length > 4) {
        displayTitle = displayTitle.slice(0, -4) + '…'
      }

      ctx.fillText(displayTitle, 16, stripY + stripH / 2)

      // ── Category badge ──
      ctx.font = `500 11px "Inter", "PingFang SC", "Microsoft YaHei", sans-serif`
      const catWidth = ctx.measureText(category).width
      const badgeX = w - catWidth - 24
      ctx.fillStyle = palette.accent
      ctx.globalAlpha = 0.7
      ctx.fillText(category, badgeX, stripY + stripH / 2)
      ctx.globalAlpha = 1
    }

    draw()

    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(draw)
    })
    observer.observe(container)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [title, category, slug, palette])

  return (
    <div ref={containerRef} className="w-full overflow-hidden rounded-t-lg">
      <canvas
        ref={canvasRef}
        className="block w-full"
        aria-hidden="true"
      />
    </div>
  )
}
