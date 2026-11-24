"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { projects } from "@/lib/projects"
import { site } from "@/lib/data"
import { OPEN_PALETTE, OPEN_TERMINAL } from "@/lib/events"

type Command = { id: string; group: string; label: string; hint?: string; run: () => void }

export function PaletteButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE))}
      aria-label="Ouvrir la palette de commandes"
      className="hidden md:inline-flex items-center gap-2 rounded-md border border-[#B6B4BD]/20 px-2.5 py-1 font-mono text-xs text-white/50 transition-colors duration-200 hover:border-white/50 hover:text-white"
    >
      Rechercher
      <kbd className="text-white/35">Ctrl K</kbd>
    </button>
  )
}

export default function CommandPalette() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)

  const commands = useMemo<Command[]>(() => {
    const go = (hash: string) => () => {
      if (window.location.pathname === "/") {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" })
      } else {
        router.push(`/${hash}`)
      }
    }
    const list: Command[] = [
      { id: "stage", group: "Aller à", label: "Stage", run: go("#stage") },
      { id: "projets", group: "Aller à", label: "Projets", run: go("#projets") },
      { id: "competences", group: "Aller à", label: "Compétences", run: go("#competences") },
      { id: "contact", group: "Aller à", label: "Contact", run: go("#contact") },
      ...projects.map((p) => ({
        id: `p-${p.slug}`,
        group: "Projets",
        label: p.title,
        hint: String(p.context),
        run: () => router.push(`/projets/${p.slug}`),
      })),
      {
        id: "mail",
        group: "Actions",
        label: "Copier l'adresse email",
        hint: site.email,
        run: () => void navigator.clipboard?.writeText(site.email),
      },
      {
        id: "github",
        group: "Actions",
        label: "Ouvrir GitHub",
        run: () => void window.open(site.github, "_blank", "noopener,noreferrer"),
      },
    ]
    if (site.linkedin) {
      list.push({
        id: "linkedin",
        group: "Actions",
        label: "Ouvrir LinkedIn",
        run: () => void window.open(site.linkedin, "_blank", "noopener,noreferrer"),
      })
    }
    list.push({
      id: "terminal",
      group: "Actions",
      label: "Ouvrir le terminal",
      hint: "bonus",
      run: () => void window.dispatchEvent(new Event(OPEN_TERMINAL)),
    })
    return list
  }, [router])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter((c) => `${c.label} ${c.group} ${c.hint ?? ""}`.toLowerCase().includes(q))
  }, [commands, query])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setQuery("")
        setActive(0)
        setOpen((value) => !value)
      }
    }
    const onOpen = () => {
      setQuery("")
      setActive(0)
      setOpen(true)
    }
    window.addEventListener("keydown", onKey)
    window.addEventListener(OPEN_PALETTE, onOpen)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener(OPEN_PALETTE, onOpen)
    }
  }, [])

  const close = () => setOpen(false)

  const run = (command: Command | undefined) => {
    if (!command) return
    close()
    command.run()
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 px-4 pt-[15vh] animate-[fadeIn_0.15s_ease-out]"
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Palette de commandes"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-xl border border-[#B6B4BD]/20 bg-[#1a1918] shadow-2xl"
      >
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setActive(0)
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault()
              setActive((i) => Math.min(i + 1, results.length - 1))
            } else if (e.key === "ArrowUp") {
              e.preventDefault()
              setActive((i) => Math.max(i - 1, 0))
            } else if (e.key === "Enter") {
              e.preventDefault()
              run(results[active])
            } else if (e.key === "Escape") {
              close()
            }
          }}
          placeholder="Rechercher une section, un projet, une action…"
          aria-label="Rechercher"
          className="w-full border-b border-[#B6B4BD]/15 bg-transparent px-5 py-4 text-base text-white placeholder:text-white/30 focus:outline-none"
        />
        <ul className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <li className="px-3 py-6 text-center text-sm text-white/40">Aucun résultat</li>
          )}
          {results.map((command, i) => (
            <li key={command.id}>
              {(i === 0 || results[i - 1]?.group !== command.group) && (
                <p className="px-3 pt-3 pb-1 font-mono text-[11px] uppercase tracking-[0.12em] text-white/30">
                  {command.group}
                </p>
              )}
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => run(command)}
                className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-left text-sm ${
                  i === active ? "bg-white/10 text-white" : "text-white/70"
                }`}
              >
                <span className="truncate">{command.label}</span>
                {command.hint && (
                  <span className="shrink-0 font-mono text-xs text-white/30">{command.hint}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
        <p className="border-t border-[#B6B4BD]/15 px-5 py-2.5 font-mono text-[11px] text-white/30">
          ↑↓ naviguer · Entrée valider · Échap fermer
        </p>
      </div>
    </div>
  )
}
