"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  color: string
}

interface Skill {
  name: string
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  category: string
  exploding?: boolean
  explosionProgress?: number
  spawning?: boolean
  spawnProgress?: number
}

interface Connection {
  from: number
  to: number
  progress: number
}

const skillsData = [
  { name: "Assembly", category: "low-level" },
  { name: "C", category: "low-level" },
  { name: "C++", category: "low-level" },
  { name: "Java", category: "oop" },
  { name: "Kotlin", category: "oop" },
  { name: "Python", category: "backend" },
  { name: "JavaScript", category: "web" },
  { name: "TypeScript", category: "web" },
  { name: "PHP", category: "backend" },
  { name: "HTML", category: "web" },
  { name: "CSS", category: "web" },
  { name: "Tailwind", category: "web" },
  { name: "Next.js", category: "web" },
  { name: "React", category: "web" },
  { name: "UE5", category: "game-engine" },
  { name: "Unity", category: "game-engine" },
  { name: "Godot", category: "game-engine" },
  { name: "Figma", category: "design" },
  { name: "AGILE", category: "methodology" },
  { name: "Android Studio", category: "mobile" },
  { name: "Shell", category: "devops" },
  { name: "Apache", category: "devops" },
  { name: "Wireshark", category: "devops" },
  { name: "MongoDB", category: "database" },
  { name: "MySQL", category: "database" },
  { name: "MariaDB", category: "database" },
  { name: "SQLite", category: "database" },
  { name: "OpenCV", category: "ml" },
  { name: "PyTorch", category: "ml" },
]

const softSkillsData = [
  { name: "Travail d'équipe", category: "soft" },
  { name: "Communication", category: "soft" },
  { name: "Leadership", category: "soft" },
  { name: "Créativité", category: "soft" },
  { name: "Résolution de problèmes", category: "soft" },
  { name: "Adaptabilité", category: "soft" },
  { name: "Pensée critique", category: "soft" },
  { name: "Gestion du temps", category: "soft" },
  { name: "Autonomie", category: "soft" },
  { name: "Esprit d'initiative", category: "soft" },
]

export default function AnimatedSkills() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [skillsState, setSkillsState] = useState<Skill[]>([])
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const [connections, setConnections] = useState<Connection[]>([])
  const [particles, setParticles] = useState<Particle[]>([])
  const [showingSoftSkills, setShowingSoftSkills] = useState(false)
  const animationFrameRef = useRef<number>()
  const lastTimeRef = useRef<number>(0)
  const dragPositionRef = useRef<{ x: number; y: number } | null>(null)
  const prevDragPositionRef = useRef<{ x: number; y: number } | null>(null)
  const lastVelocityRef = useRef<{ vx: number; vy: number }>({ vx: 0, vy: 0 })
  const isDraggingRef = useRef<boolean>(false)
  const draggedSkillRef = useRef<number | null>(null)

  useEffect(() => {
    const allDestroyed = skillsState.length > 0 && skillsState.every((skill) => skill.exploding)
    
    if (allDestroyed && !showingSoftSkills) {
      // Vider les connexions immédiatement
      setConnections([])
      
      setTimeout(() => {
        setShowingSoftSkills(true)
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        
        const softSkills = softSkillsData.map((skillData) => ({
          name: skillData.name,
          category: skillData.category,
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: 0,
          vy: 0,
          rotation: 0,
          rotationSpeed: (Math.random() - 0.5) * 0.5,
          spawning: true,
          spawnProgress: 0,
        }))
        
        setSkillsState(softSkills)
        
        // Créer les connexions après que l'animation de spawn soit terminée
        setTimeout(() => {
          const newConnections: Connection[] = []
          softSkills.forEach((skill, index) => {
            const sameCategoryIndices = softSkills
              .map((other, otherIndex) => ({
                index: otherIndex,
                distance: Math.sqrt(Math.pow(skill.x - other.x, 2) + Math.pow(skill.y - other.y, 2)),
              }))
              .filter((d) => d.index !== index && softSkills[d.index].category === skill.category)
              .sort((a, b) => a.distance - b.distance)
              .slice(0, 1)

            sameCategoryIndices.forEach((d) => {
              if (index < d.index) {
                newConnections.push({
                  from: index,
                  to: d.index,
                  progress: Math.random(),
                })
              }
            })
          })
          setConnections(newConnections)
        }, 700) // Attendre ~700ms pour que l'animation de spawn soit terminée
      }, 1000)
    }
  }, [skillsState, showingSoftSkills])

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const rect = container.getBoundingClientRect()

    const initialSkills = skillsData.map((skillData) => ({
      name: skillData.name,
      category: skillData.category,
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      vx: (Math.random() - 0.5) * 2.5,
      vy: (Math.random() - 0.5) * 2.5,
      rotation: 0,
      rotationSpeed: (Math.random() - 0.5) * 0.5,
    }))

    setSkillsState(initialSkills)

    const newConnections: Connection[] = []
    initialSkills.forEach((skill, index) => {
      // Trouver tous les skills de la même catégorie
      const sameCategoryIndices = initialSkills
        .map((other, otherIndex) => ({
          index: otherIndex,
          distance: Math.sqrt(Math.pow(skill.x - other.x, 2) + Math.pow(skill.y - other.y, 2)),
        }))
        .filter((d) => d.index !== index && initialSkills[d.index].category === skill.category)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, 1) // Limiter à 1 connexion max par skill

      // Créer des connexions avec les skills de la même catégorie les plus proches
      sameCategoryIndices.forEach((d) => {
        if (index < d.index) {
          newConnections.push({
            from: index,
            to: d.index,
            progress: Math.random(),
          })
        }
      })
    })
    setConnections(newConnections)

    const animate = (currentTime: number) => {
      if (currentTime - lastTimeRef.current < 33) {
        animationFrameRef.current = requestAnimationFrame(animate)
        return
      }
      lastTimeRef.current = currentTime

      setSkillsState((prevSkills) =>
        prevSkills
          .map((skill, index) => {
            if (index === draggedSkillRef.current && isDraggingRef.current && dragPositionRef.current) {
              let vx = 0
              let vy = 0
              if (prevDragPositionRef.current) {
                vx = (dragPositionRef.current.x - prevDragPositionRef.current.x) * 0.15
                vy = (dragPositionRef.current.y - prevDragPositionRef.current.y) * 0.15
                lastVelocityRef.current = { vx, vy }
              }
              prevDragPositionRef.current = dragPositionRef.current
              return {
                ...skill,
                x: dragPositionRef.current.x,
                y: dragPositionRef.current.y,
                vx: 0,
                vy: 0,
              }
            }

            if (skill.exploding) {
              const progress = (skill.explosionProgress || 0) + 0.05
              
              if (progress >= 1) {
                return null
              }
              
              return {
                ...skill,
                explosionProgress: progress,
              }
            }

            if (skill.spawning) {
              const progress = (skill.spawnProgress || 0) + 0.04
              
              if (progress >= 1) {
                return {
                  ...skill,
                  spawning: false,
                  spawnProgress: 1,
                  vx: (Math.random() - 0.5) * 2.5,
                  vy: (Math.random() - 0.5) * 2.5,
                }
              }
              
              return {
                ...skill,
                spawnProgress: progress,
              }
            }

            const rect = container.getBoundingClientRect()
            let { x, y, vx, vy, rotation, rotationSpeed } = skill

            x += vx
            y += vy

            const boxSize = 40
            if (x < boxSize || x > rect.width - boxSize) vx *= -1
            if (y < boxSize || y > rect.height - boxSize) vy *= -1

            x = Math.max(boxSize, Math.min(rect.width - boxSize, x))
            y = Math.max(boxSize, Math.min(rect.height - boxSize, y))

            if (index !== draggedSkillRef.current) {
              rotation += rotationSpeed
            }

            return {
              ...skill,
              x,
              y,
              vx,
              vy,
              rotation,
            }
          })
          .filter((skill) => skill !== null) as Skill[],
      )

      setParticles((prevParticles) =>
        prevParticles
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.2,
            life: particle.life + 1,
          }))
          .filter((particle) => particle.life < particle.maxLife),
      )

      setConnections((prev) =>
        prev.map((conn) => ({
          ...conn,
          progress: (conn.progress + 0.008) % 1,
        })),
      )

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || skillsState.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    connections.forEach((conn) => {
      const from = skillsState[conn.from]
      const to = skillsState[conn.to]

      if (!from || !to) return

      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(from.x, from.y)
      ctx.lineTo(to.x, to.y)
      ctx.stroke()

      const dx = to.x - from.x
      const dy = to.y - from.y
      const currentX = from.x + dx * conn.progress
      const currentY = from.y + dy * conn.progress

      const gradient = ctx.createRadialGradient(currentX, currentY, 0, currentX, currentY, 8)
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)")
      gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(currentX, currentY, 4, 0, Math.PI * 2)
      ctx.fill()
    })
  }, [skillsState, connections])

  const handleClick = (index: number) => {
    const skillToExplode = skillsState[index]
    if (skillToExplode && !skillToExplode.exploding) {
      // Créer des particules
      const newParticles: Particle[] = []
      const particleCount = 20
      const colors = ["#ffffff", "#e5e7eb", "#d1d5db", "#9ca3af"]
      
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount
        const speed = 3 + Math.random() * 2
        newParticles.push({
          x: skillToExplode.x,
          y: skillToExplode.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 30 + Math.random() * 20,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
      
      setParticles((prev) => [...prev, ...newParticles])
      
      setSkillsState((prev) =>
        prev.map((skill) =>
          skill.name === skillToExplode.name
            ? {
                ...skill,
                exploding: true,
                explosionProgress: 0,
              }
            : skill,
        ),
      )
    }
  }

  return (
    <div className="w-full px-6 md:px-12 lg:px-20 py-12">
      <div className="max-w-7xl mx-auto">
        <div
          ref={containerRef}
          className="relative w-full h-[400px] md:h-[500px] rounded-2xl bg-[#1a1918] border border-[#2a2928] overflow-hidden"
        >
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {particles.map((particle, index) => (
        <div
          key={`particle-${index}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: "8px",
            height: "8px",
            backgroundColor: particle.color,
            opacity: 1 - particle.life / particle.maxLife,
            transform: "translate(-50%, -50%)",
            boxShadow: `0 0 10px ${particle.color}`,
          }}
        />
      ))}

      {skillsState.map((skill, index) => {
        const isHovered = hoveredSkill === skill.name
        const explosionProgress = skill.explosionProgress || 0
        const spawnProgress = skill.spawnProgress || 0
        
        // Ease out function
        const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
        const easedSpawnProgress = easeOut(spawnProgress)
        
        let scale = 1
        let opacity = 1
        
        if (skill.exploding) {
          scale = 1 + explosionProgress * 0.5
          opacity = 1 - explosionProgress
        } else if (skill.spawning) {
          scale = 0.3 + easedSpawnProgress * 0.7
          opacity = easedSpawnProgress
        } else if (isHovered) {
          scale = 1.15
        }

        return (
          <div
            key={`${skill.name}-${index}`}
            className={`absolute ${skill.exploding || skill.spawning ? "" : "transition-transform duration-200"}`}
            style={{
              left: `${skill.x}px`,
              top: `${skill.y}px`,
              transform: `
                translate(-50%, -50%) 
                rotate(${skill.exploding ? skill.rotation + explosionProgress * 180 : skill.rotation}deg) 
                scale(${scale})
              `,
              opacity: opacity,
              zIndex: 1,
              pointerEvents: skill.exploding || skill.spawning ? "none" : "auto",
              filter: skill.exploding ? `blur(${explosionProgress * 4}px)` : "none",
            }}
            onMouseEnter={() => !skill.exploding && !skill.spawning && setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
            onClick={() => !skill.exploding && !skill.spawning && handleClick(index)}
          >
            <div
              className={`
                px-4 py-2 md:px-5 md:py-2.5 rounded-lg
                bg-[#201f1e] 
                border border-[#3a3938]
                cursor-pointer
                transition-all duration-200
                ${isHovered ? "bg-[#2a2928] border-[#4a4948] shadow-[0_0_20px_rgba(255,255,255,0.15)]" : ""}
              `}
            >
              <span className="text-xs md:text-sm font-medium text-white whitespace-nowrap select-none">{skill.name}</span>
            </div>
          </div>
        )
      })}
        </div>
      </div>
    </div>
  )
}
