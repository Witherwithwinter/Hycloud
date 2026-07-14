import { useRef, useState, useCallback, useEffect, CSSProperties } from 'react';

type Falloff = 'linear' | 'smooth' | 'sharp';

export interface LineSidebarProps {
  items?: string[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: Falloff;
  markerLength?: number;
  markerGap?: number;
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
  defaultActive?: number | null;
  onItemClick?: (index: number, label: string) => void;
  renderItem?: (index: number, label: string) => React.ReactNode;
  className?: string;
}

const FALLOFF_CURVES: Record<Falloff, (p: number) => number> = {
  linear: p => p,
  smooth: p => p * p * (3 - 2 * p),
  sharp: p => p * p * p
};

// Helper: mix two hex/rgb colors by ratio [0..1]
function mixColor(color1: string, color2: string, ratio: number): string {
  // Parse accentColor and textColor as RGB
  const parseRGB = (c: string): [number, number, number] => {
    if (c.startsWith('#')) {
      const bigint = parseInt(c.slice(1), 16);
      return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
    }
    // Handle rgb/rgba
    const m = c.match(/(\d+)/g);
    return m ? [parseInt(m[0]), parseInt(m[1]), parseInt(m[2])] : [128, 128, 128];
  };

  const [r1, g1, b1] = parseRGB(color1);
  const [r2, g2, b2] = parseRGB(color2);
  const r = Math.round(r1 + (r2 - r1) * ratio);
  const g = Math.round(g1 + (g2 - g1) * ratio);
  const b = Math.round(b1 + (b2 - b1) * ratio);
  return `rgb(${r}, ${g}, ${b})`;
}

const LineSidebar = ({
  items,
  accentColor = '#000000',
  textColor = '#c4c4c4',
  markerColor = '#6c6c6c',
  showIndex = true,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 30,
  falloff = 'smooth',
  markerLength = 60,
  markerGap = 0,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 20,
  fontSize = 1.1,
  smoothing = 100,
  defaultActive = null,
  onItemClick,
  renderItem,
  className = ''
}: LineSidebarProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const activeRef = useRef<number | null>(defaultActive);
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultActive);
  const [enteringItems, setEnteringItems] = useState<Set<number>>(new Set());
  const [hoverEffects, setHoverEffects] = useState<Map<number, number>>(new Map());

  useEffect(() => {
    const timer = setTimeout(() => {
      setEnteringItems(new Set(items?.map((_, i) => i) || []));
    }, 50);
    return () => clearTimeout(timer);
  }, [items]);

  activeRef.current = activeIndex;

  const computeHoverEffects = useCallback(
    (e: React.PointerEvent<HTMLUListElement>) => {
      const list = listRef.current;
      if (!list) return;
      const rect = list.getBoundingClientRect();
      const pointerY = e.clientY - rect.top;
      const ease = FALLOFF_CURVES[falloff] ?? FALLOFF_CURVES.linear;
      const effects: Map<number, number> = new Map();
      const els = itemRefs.current;
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (!el) continue;
        const center = el.offsetTop + el.offsetHeight / 2;
        const distance = Math.abs(pointerY - center);
        const raw = ease(Math.max(0, 1 - distance / proximityRadius));
        const boosted = activeRef.current === i ? 1 : raw;
        effects.set(i, boosted);
      }
      setHoverEffects(effects);
    },
    [falloff, proximityRadius]
  );

  const handlePointerLeave = useCallback(() => {
    setHoverEffects(new Map());
  }, []);

  const handleClick = useCallback(
    (index: number, label: string) => {
      setActiveIndex(index);
      onItemClick?.(index, label);
    },
    [onItemClick]
  );

  useEffect(() => {
    setActiveIndex(defaultActive);
  }, [defaultActive]);

  const getEffect = (index: number): number => {
    const fromHover = hoverEffects.get(index);
    if (fromHover !== undefined) return fromHover;
    return activeIndex === index ? 1 : 0;
  };

  const transitionDuration = `${smoothing}ms`;

  return (
    <nav
      className={`relative flex justify-start${showMarker ? ` pl-[${markerLength + markerGap}px]` : ''}${className ? ` ${className}` : ''}`}
      style={{}}
    >
      <ul
        ref={listRef}
        onPointerMove={computeHoverEffects}
        onPointerLeave={handlePointerLeave}
        style={{
          margin: 0,
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          padding: '16px',
          gap: `${itemGap}px`,
        }}
      >
        {items?.map((label, index) => {
          const isEntering = enteringItems.has(index);
          const transitionDelay = isEntering ? `${index * 60}ms` : '0ms';
          const effect = getEffect(index);

          // Compute derived values directly from effect
          const markerOpacity = effect;
          const markerScaleX = 0.7 + effect * 0.5;
          const textColorMix = mixColor(textColor, accentColor, effect);
          const textTranslateX = effect * maxShift;
          const indexOpacity = 0.55 + effect * 0.45;
          const tickScaleX = scaleTick ? 0.7 + effect * 0.6 : 1;
          const tickWidth = markerLength * tickScale;

          return (
            <li
              key={`${label}-${index}`}
              ref={el => {
                itemRefs.current[index] = el;
              }}
              aria-current={activeIndex === index ? 'true' : undefined}
              onClick={() => handleClick(index, label)}
              style={{
                position: 'relative',
                cursor: 'pointer',
                transitionDelay,
              }}
              className={`toc-item ${isEntering ? 'toc-item-enter' : ''}`}
            >
              {showMarker && (
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: `calc(-1 * (${markerLength}px + ${markerGap}px))`,
                    top: '50%',
                    height: '1px',
                    width: `${markerLength}px`,
                    transformOrigin: 'left',
                    transform: `translateY(-50%) scaleX(${markerScaleX})`,
                    backgroundColor: mixColor(markerColor, accentColor, markerOpacity),
                    transition: `background-color ${transitionDuration} ease, transform ${transitionDuration} ease`,
                  }}
                />
              )}
              {/* Tick mark */}
              <span
                style={{
                  position: 'absolute',
                  left: `calc(-1 * (${markerLength}px + ${markerGap}px))`,
                  top: `calc(100% + ${itemGap / 2}px)`,
                  height: '1px',
                  opacity: 0.5,
                  content: "''",
                  backgroundColor: markerColor,
                  width: `${tickWidth}px`,
                  transformOrigin: scaleTick ? 'left' : undefined,
                  transform: `translateY(-50%) scaleX(${tickScaleX})`,
                  transition: `transform ${transitionDuration} ease`,
                }}
                className="last:hidden"
              />
              <span
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  alignItems: 'baseline',
                  lineHeight: 1.2,
                  color: textColorMix,
                  fontSize: `${fontSize}rem`,
                  transform: `translateX(${textTranslateX}px)`,
                  transition: `color ${transitionDuration} ease, transform ${transitionDuration} ease, font-size ${transitionDuration} ease`,
                }}
              >
                {showIndex && (
                  <span
                    style={{
                      marginRight: '0.6rem',
                      fontFamily: 'monospace',
                      fontSize: '0.85em',
                      opacity: indexOpacity,
                      transition: `opacity ${transitionDuration} ease`,
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                )}
                <span>{renderItem ? renderItem(index, label) : label}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default LineSidebar;
