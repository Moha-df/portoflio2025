"use client"

import { useRef, useState, useEffect } from "react"

export default function AnimatedSkills2() {
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

  // Répéter les skills pour remplir l'écran
  const skills = [
    { name: "ASSEMBLY", url: "https://en.wikipedia.org/wiki/Assembly_language" },
    { name: "C", url: "https://en.wikipedia.org/wiki/C_(programming_language)" },
    { name: "C++", url: "https://cplusplus.com/" },
    { name: "JAVA", url: "https://www.java.com/" },
    { name: "KOTLIN", url: "https://kotlinlang.org/" },
    { name: "PYTHON", url: "https://www.python.org/" },
    { name: "JAVASCRIPT", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "TYPESCRIPT", url: "https://www.typescriptlang.org/" },
    { name: "PHP", url: "https://www.php.net/" },
    { name: "HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { name: "CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { name: "TAILWIND", url: "https://tailwindcss.com/" },
    { name: "NEXT.JS", url: "https://nextjs.org/" },
    { name: "REACT", url: "https://react.dev/" },
    { name: "UE5", url: "https://www.unrealengine.com/" },
    { name: "UNITY", url: "https://unity.com/" },
    { name: "GODOT", url: "https://godotengine.org/" },
    { name: "FIGMA", url: "https://www.figma.com/" },
    { name: "AGILE", url: "https://en.wikipedia.org/wiki/Agile_software_development" },
    { name: "ANDROID STUDIO", url: "https://developer.android.com/studio" },
    { name: "SHELL", url: "https://en.wikipedia.org/wiki/Shell_script" },
    { name: "APACHE", url: "https://httpd.apache.org/" },
    { name: "WIRESHARK", url: "https://www.wireshark.org/" },
    { name: "MONGODB", url: "https://www.mongodb.com/" },
    { name: "MYSQL", url: "https://www.mysql.com/" },
    { name: "MARIADB", url: "https://mariadb.org/" },
    { name: "SQLITE", url: "https://www.sqlite.org/" },
    { name: "OPENCV", url: "https://opencv.org/" },
    { name: "PYTORCH", url: "https://pytorch.org/" },
  ]

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

  const handleLinkClick = (e: React.MouseEvent, url: string) => {
    if (hasDragged) {
      e.preventDefault()
      return
    }
    window.open(url, '_blank', 'noopener,noreferrer')
    e.preventDefault()
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

  // Créer des lignes avec des skills répétés pour remplir l'écran
  const line1 = [...skills, ...skills, ...skills].map((s, i) => (
    <span 
      key={`line1-${i}`}
      onClick={(e) => handleLinkClick(e, s.url)}
      onDragStart={(e) => e.preventDefault()}
      className="hover:text-white/30 transition-colors duration-300 cursor-pointer"
    >
      {s.name}
    </span>
  )).flatMap((item, i, arr) => 
    i < arr.length - 1 ? [item, <span key={`sep1-${i}`} className="select-none"> • </span>] : [item]
  )

  const line2 = [...skills, ...skills, ...skills].map((s, i) => (
    <span 
      key={`line2-${i}`}
      onClick={(e) => handleLinkClick(e, s.url)}
      onDragStart={(e) => e.preventDefault()}
      className="hover:text-white/30 transition-colors duration-300 cursor-pointer"
    >
      {s.name}
    </span>
  )).flatMap((item, i, arr) => 
    i < arr.length - 1 ? [item, <span key={`sep2-${i}`} className="select-none"> • </span>] : [item]
  )

  const line3 = [...skills, ...skills, ...skills].map((s, i) => (
    <span 
      key={`line3-${i}`}
      onClick={(e) => handleLinkClick(e, s.url)}
      onDragStart={(e) => e.preventDefault()}
      className="hover:text-white/30 transition-colors duration-300 cursor-pointer"
    >
      {s.name}
    </span>
  )).flatMap((item, i, arr) => 
    i < arr.length - 1 ? [item, <span key={`sep3-${i}`} className="select-none"> • </span>] : [item]
  )

  return (
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
            {line1}
          </span>
          <span className="text-6xl md:text-8xl lg:text-9xl font-black text-[#B6B4BD]/15 flex gap-0">
            {line1}
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
            {line2}
          </span>
          <span className="text-6xl md:text-8xl lg:text-9xl font-black text-[#9c9aa3]/12 flex gap-0">
            {line2}
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
            {line3}
          </span>
          <span className="text-6xl md:text-8xl lg:text-9xl font-black text-[#a8a6af]/13 flex gap-0">
            {line3}
          </span>
        </div>
      </div>
    </div>
  )
}
