"use client"

import { useRef, useState, useEffect } from "react"

interface Item {
  name: string
  url: string
}

interface ThreeListProps {
  items: Item[]
  title1?: string
  title2?: string
  speed1?: number
  speed2?: number
  speed3?: number
  color1?: string
  color2?: string
  color3?: string
  backgroundColor?: string
  showTitle?: boolean
}

export default function ThreeList({ 
  items, 
  title1,
  title2,
  speed1 = 100, 
  speed2 = 140, 
  speed3 = 120,
  color1 = "#B6B4BD",
  color2 = "#9c9aa3",
  color3 = "#a8a6af",
  backgroundColor = "#151312",
  showTitle = false
}: ThreeListProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollOffsetRef = useRef(0)
  const isDraggingRef = useRef(false)
  const [isPaused, setIsPaused] = useState(false)
  const [hasDragged, setHasDragged] = useState(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)

  const updateTransform = (offset: number) => {
    if (line1Ref.current) {
      line1Ref.current.style.transform = `translateX(${offset}px)`
    }
    if (line2Ref.current) {
      line2Ref.current.style.transform = `translateX(${offset}px)`
    }
    if (line3Ref.current) {
      line3Ref.current.style.transform = `translateX(${offset}px)`
    }
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true
    setIsPaused(true)
    setHasDragged(false)
    startXRef.current = e.pageX
    scrollLeftRef.current = scrollOffsetRef.current
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingRef.current) return
    e.preventDefault()
    const x = e.pageX
    const walk = (x - startXRef.current) * 2
    if (Math.abs(walk) > 5) {
      setHasDragged(true)
    }
    scrollOffsetRef.current = scrollLeftRef.current + walk
    updateTransform(scrollOffsetRef.current)
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
    setIsPaused(false)
  }

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    if (hasDragged) {
      e.preventDefault()
      return
    }
    window.open(url, '_blank', 'noopener,noreferrer')
    e.preventDefault()
  }

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => handleMouseMove(e)
    const onMouseUp = () => handleMouseUp()

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  // Créer des lignes avec des items répétés pour remplir l'écran
  const line1 = [...items, ...items, ...items].map((item, i) => (
    <span 
      key={`line1-${i}`}
      onClick={(e) => handleLinkClick(e, item.url)}
      onDragStart={(e) => e.preventDefault()}
      className="hover:text-white/30 transition-colors duration-300 cursor-pointer"
    >
      {item.name}
    </span>
  )).flatMap((item, i, arr) => 
    i < arr.length - 1 ? [item, <span key={`sep1-${i}`} className="select-none"> • </span>] : [item]
  )

  const line2 = [...items, ...items, ...items].map((item, i) => (
    <span 
      key={`line2-${i}`}
      onClick={(e) => handleLinkClick(e, item.url)}
      onDragStart={(e) => e.preventDefault()}
      className="hover:text-white/30 transition-colors duration-300 cursor-pointer"
    >
      {item.name}
    </span>
  )).flatMap((item, i, arr) => 
    i < arr.length - 1 ? [item, <span key={`sep2-${i}`} className="select-none"> • </span>] : [item]
  )

  const line3 = [...items, ...items, ...items].map((item, i) => (
    <span 
      key={`line3-${i}`}
      onClick={(e) => handleLinkClick(e, item.url)}
      onDragStart={(e) => e.preventDefault()}
      className="hover:text-white/30 transition-colors duration-300 cursor-pointer"
    >
      {item.name}
    </span>
  )).flatMap((item, i, arr) => 
    i < arr.length - 1 ? [item, <span key={`sep3-${i}`} className="select-none"> • </span>] : [item]
  )

  return (
    <div className="w-full py-20 px-6 md:px-12 lg:px-20" style={{ backgroundColor }}>
      {showTitle && title1 && (
        <div className="max-w-7xl mx-auto mb-12">
          <h2 className="mb-0">
            <span className="block leading-none mb-2" style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(48px, 8vw, 94px)",
              fontWeight: 1000,
              letterSpacing: "0em",
              lineHeight: "100%",
              color: "#ffffff",
            }}>
              {title1}
            </span>
            {title2 && (
              <span className="block leading-none" style={{
                fontFamily: "var(--font-family, 'Poppins', sans-serif)",
                fontSize: "clamp(48px, 8vw, 94px)",
                fontWeight: 1000,
                letterSpacing: "0em",
                lineHeight: "1.2em",
                textAlign: "start",
                color: "#B6B4BD",
                opacity: 0.33,
              }}>
                {title2}
              </span>
            )}
          </h2>
        </div>
      )}

      <div 
        ref={containerRef}
        className="w-screen relative left-1/2 right-1/2 -mx-[50vw] overflow-hidden py-12 space-y-8 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        style={{ userSelect: 'none' }}
      >
        {/* Ligne 1: Droite à gauche */}
        <div ref={line1Ref} className="relative flex whitespace-nowrap">
          <div 
            className="flex gap-0" 
            style={{ 
              animation: `scrollRight ${speed1}s linear infinite`,
              animationDelay: '0s',
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            <span className="text-6xl md:text-8xl lg:text-9xl font-black flex gap-0" style={{ color: `${color1}15` }}>
              {line1}
            </span>
            <span className="text-6xl md:text-8xl lg:text-9xl font-black flex gap-0" style={{ color: `${color1}15` }}>
              {line1}
            </span>
          </div>
        </div>

        {/* Ligne 2: Droite à gauche */}
        <div ref={line2Ref} className="relative flex whitespace-nowrap">
          <div 
            className="flex gap-0" 
            style={{ 
              animation: `scrollRight ${speed2}s linear infinite`,
              animationDelay: '-30s',
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            <span className="text-6xl md:text-8xl lg:text-9xl font-black flex gap-0" style={{ color: `${color2}12` }}>
              {line2}
            </span>
            <span className="text-6xl md:text-8xl lg:text-9xl font-black flex gap-0" style={{ color: `${color2}12` }}>
              {line2}
            </span>
          </div>
        </div>

        {/* Ligne 3: Droite à gauche */}
        <div ref={line3Ref} className="relative flex whitespace-nowrap">
          <div 
            className="flex gap-0" 
            style={{ 
              animation: `scrollRight ${speed3}s linear infinite`,
              animationDelay: '-60s',
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            <span className="text-6xl md:text-8xl lg:text-9xl font-black flex gap-0" style={{ color: `${color3}13` }}>
              {line3}
            </span>
            <span className="text-6xl md:text-8xl lg:text-9xl font-black flex gap-0" style={{ color: `${color3}13` }}>
              {line3}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
