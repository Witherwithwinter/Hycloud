"use client"

import { cn } from "@/lib/utils"
import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
  useCallback,
} from "react"

// ── Context ─────────────────────────────────────────────────

interface MouseState {
  isEntered: boolean
  mouseX: number // -1 … 1
  mouseY: number // -1 … 1
}

const MouseEnterContext = createContext<MouseState>({
  isEntered: false,
  mouseX: 0,
  mouseY: 0,
})

export const useMouseEnter = () => useContext(MouseEnterContext)

// ── CardContainer ───────────────────────────────────────────

export const CardContainer = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode
  className?: string
  containerClassName?: string
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mouseState, setMouseState] = useState<MouseState>({
    isEntered: false,
    mouseX: 0,
    mouseY: 0,
  })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect()

    const mx = ((e.clientX - left) / width) * 2 - 1
    const my = ((e.clientY - top) / height) * 2 - 1

    setMouseState({ isEntered: true, mouseX: mx, mouseY: my })

    const rotateY = mx * 18
    const rotateX = -my * 18

    // Instant — no transition during movement
    containerRef.current.style.transition = "none"
    containerRef.current.style.transform =
      `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`
  }, [])

  const handleMouseEnter = useCallback(() => {
    setMouseState((prev) => ({ ...prev, isEntered: true }))
  }, [])

  const handleMouseLeave = useCallback(() => {
    setMouseState({ isEntered: false, mouseX: 0, mouseY: 0 })
    if (!containerRef.current) return

    // Smooth reset
    containerRef.current.style.transition =
      "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
    containerRef.current.style.transform =
      "rotateY(0deg) rotateX(0deg)"
  }, [])

  return (
    <MouseEnterContext.Provider value={mouseState}>
      <div
        className={cn("py-3 flex items-center justify-center", containerClassName)}
        style={{ perspective: "1000px" }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn("relative w-full rounded-xl", className)}
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  )
}

// ── CardBody ────────────────────────────────────────────────

export const CardBody = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        "w-full rounded-[inherit]",
        "[transform-style:preserve-3d]",
        "[&>*]:[transform-style:preserve-3d]",
        className
      )}
    >
      {children}
    </div>
  )
}

// ── CardItem ────────────────────────────────────────────────

export const CardItem = ({
  as: Tag = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: {
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  translateX?: number | string
  translateY?: number | string
  translateZ?: number | string
  rotateX?: number | string
  rotateY?: number | string
  rotateZ?: number | string
  [key: string]: any
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { isEntered } = useMouseEnter()

  useEffect(() => {
    if (!ref.current) return
    if (isEntered) {
      ref.current.style.transform =
        `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
    } else {
      ref.current.style.transform =
        "translate3d(0px, 0px, 0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)"
    }
  }, [isEntered, translateX, translateY, translateZ, rotateX, rotateY, rotateZ])

  return (
    <Tag
      ref={ref}
      className={cn("w-fit transition-transform duration-200 ease-linear", className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}
