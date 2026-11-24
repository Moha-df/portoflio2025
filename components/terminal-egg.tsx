"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { projects } from "@/lib/projects"
import { site } from "@/lib/data"
import { OPEN_TERMINAL } from "@/lib/events"

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
]

const HELP = [
  "help        cette aide",
  "whoami      qui suis-je",
  "stage       ce que je cherche",
  "ls          liste des projets",
  "open <n>    ouvrir le projet n",
  "contact     me joindre",
  "clear       vider l'écran",
  "exit        fermer",
]

export default function TerminalEgg() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [lines, setLines] = useState<string[]>(["Terminal moha-df.fr — tapez « help »."])
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let pos = 0
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      if (key === KONAMI[pos]) pos += 1
      else if (key === "ArrowUp") pos = pos === 2 ? 2 : 1
      else pos = 0
      if (pos === KONAMI.length) {
        pos = 0
        setOpen(true)
      }
    }
    const onOpen = () => setOpen(true)
    window.addEventListener("keydown", onKey)
    window.addEventListener(OPEN_TERMINAL, onOpen)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener(OPEN_TERMINAL, onOpen)
    }
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [lines, open])

  const exec = (raw: string) => {
    const cmd = raw.trim()
    const [name = "", arg = ""] = cmd.toLowerCase().split(/\s+/)
    const out: string[] = []
    switch (name) {
      case "":
        break
      case "help":
        out.push(...HELP)
        break
      case "whoami":
        out.push(`${site.name} — développeur full stack, Master 2 informatique, Université de Haute-Alsace.`)
        break
      case "stage":
        out.push(
          "Stage de fin d'études de 5 à 6 mois, à partir de février 2027.",
          "Full stack, web, logiciel, mobile ou jeu vidéo.",
        )
        break
      case "ls":
        projects.forEach((p, i) => out.push(`${String(i + 1).padStart(2, "0")}  ${p.title}`))
        break
      case "open": {
        const project = projects[Number(arg) - 1]
        if (project) {
          out.push(`Ouverture de ${project.title}…`)
          router.push(`/projets/${project.slug}`)
          setOpen(false)
        } else {
          out.push("Usage : open <numéro> (voir ls)")
        }
        break
      }
      case "contact":
        out.push(site.email, site.github)
        if (site.linkedin) out.push(site.linkedin)
        break
      case "sudo":
        out.push("Permission refusée. Essayez plutôt : contact")
        break
      case "clear":
        setLines([])
        return
      case "exit":
        setOpen(false)
        return
      default:
        out.push(`commande introuvable : ${name} — tapez « help »`)
    }
    setLines((prev) => [...prev, `$ ${cmd}`, ...out])
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 p-4 sm:items-center animate-[fadeIn_0.15s_ease-out]"
      onClick={() => setOpen(false)}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Terminal"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl overflow-hidden rounded-xl border border-[#B6B4BD]/20 bg-[#0d0c0b] font-mono text-sm shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-[#B6B4BD]/15 px-4 py-2.5 text-xs text-white/40">
          <span>visiteur@moha-df.fr</span>
          <button type="button" onClick={() => setOpen(false)} className="transition-colors hover:text-white">
            fermer
          </button>
        </div>
        <div ref={scrollRef} className="h-72 overflow-y-auto px-4 py-3 text-white/75">
          {lines.map((line, i) => (
            <p key={i} className={`whitespace-pre-wrap break-words ${line.startsWith("$ ") ? "text-white" : ""}`}>
              {line}
            </p>
          ))}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              exec(input)
              setInput("")
            }}
            className="flex gap-2"
          >
            <span className="text-white/40">$</span>
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setOpen(false)
              }}
              spellCheck={false}
              autoComplete="off"
              aria-label="Commande"
              className="flex-1 bg-transparent text-white focus:outline-none"
            />
          </form>
        </div>
      </div>
    </div>
  )
}
