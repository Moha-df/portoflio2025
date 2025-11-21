"use client"

import { useRef, useState, useEffect } from "react"

export default function Projets() {
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
    // Le lien s'ouvrira normalement
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

  const projects = [
    { name: "CHATBOT", url: "https://chatbot.moha-df.fr" },
    { name: "KIOSK ANDROID APP", url: "https://github.com/Moha-df/KioskAppAndroid" },
    { name: "SCRABBLE MULTIPLAYER", url: "https://github.com/Moha-df/Scrabble-Godot" },
    { name: "AUTH SECURITY", url: "https://github.com/Moha-df/Auth-Security-with-Next.js" },
    { name: "SETUP WIZARD WINFORMS", url: "https://github.com/Moha-df/setup-wizard-winforms" },
    { name: "TIERXVIEW", url: "https://www.moha-df.fr/tierxview" },
    { name: "TABLETTESYSTEM", url: "https://www.moha-df.fr/tablettesystem" },
  ]

  // Créer des lignes avec des projets répétés pour remplir l'écran
  const line1 = [...projects, ...projects, ...projects].map((p, i) => (
    <a
      key={`line1-${i}`}
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => handleLinkClick(e, p.url)}
      onDragStart={(e) => e.preventDefault()}
      className="hover:text-white/30 transition-colors duration-300 cursor-pointer"
    >
      {p.name}
    </a>
  ))

  const line2 = [...projects, ...projects, ...projects].map((p, i) => (
    <a
      key={`line2-${i}`}
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => handleLinkClick(e, p.url)}
      onDragStart={(e) => e.preventDefault()}
      className="hover:text-white/30 transition-colors duration-300 cursor-pointer"
    >
      {p.name}
    </a>
  ))

  const line3 = [...projects, ...projects, ...projects].map((p, i) => (
    <a
      key={`line3-${i}`}
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => handleLinkClick(e, p.url)}
      onDragStart={(e) => e.preventDefault()}
      className="hover:text-white/30 transition-colors duration-300 cursor-pointer"
    >
      {p.name}
    </a>
  ))

  // Ajouter les séparateurs
  const renderLine = (items: React.ReactNode[]) => {
    return items.flatMap((item, i) => 
      i < items.length - 1 ? [item, <span key={`sep-${i}`} className="select-none"> • </span>] : [item]
    )
  }

  return (
    <div className="w-full bg-[#151312] py-20 px-6 md:px-12 lg:px-20">
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
            PROJETS
          </span>
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
            RÉALISÉS
          </span>
        </h2>
      </div>

      <div 
        ref={containerRef}
        className="w-screen relative left-1/2 right-1/2 -mx-[50vw] overflow-hidden py-12 space-y-8 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        style={{ userSelect: 'none' }}
      >
        {/* Ligne 1: Droite à gauche */}
        <div ref={line1Ref} className="relative flex whitespace-nowrap">
          <div 
            className="animate-[scrollRight_100s_linear_infinite] flex gap-0" 
            style={{ 
              animationDelay: '0s',
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            <span className="text-6xl md:text-8xl lg:text-9xl font-black text-[#B6B4BD]/15 flex gap-0">
              {renderLine(line1)}
            </span>
            <span className="text-6xl md:text-8xl lg:text-9xl font-black text-[#B6B4BD]/15 flex gap-0">
              {renderLine(line1)}
            </span>
          </div>
        </div>

        {/* Ligne 2: Droite à gauche */}
        <div ref={line2Ref} className="relative flex whitespace-nowrap">
          <div 
            className="animate-[scrollRight_140s_linear_infinite] flex gap-0" 
            style={{ 
              animationDelay: '-30s',
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            <span className="text-6xl md:text-8xl lg:text-9xl font-black text-[#9c9aa3]/12 flex gap-0">
              {renderLine(line2)}
            </span>
            <span className="text-6xl md:text-8xl lg:text-9xl font-black text-[#9c9aa3]/12 flex gap-0">
              {renderLine(line2)}
            </span>
          </div>
        </div>

        {/* Ligne 3: Droite à gauche */}
        <div ref={line3Ref} className="relative flex whitespace-nowrap">
          <div 
            className="animate-[scrollRight_120s_linear_infinite] flex gap-0" 
            style={{ 
              animationDelay: '-60s',
              animationPlayState: isPaused ? 'paused' : 'running'
            }}
          >
            <span className="text-6xl md:text-8xl lg:text-9xl font-black text-[#a8a6af]/13 flex gap-0">
              {renderLine(line3)}
            </span>
            <span className="text-6xl md:text-8xl lg:text-9xl font-black text-[#a8a6af]/13 flex gap-0">
              {renderLine(line3)}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
