"use client"

import { useEffect, useRef } from "react"
import CommandPalette from "@/components/command-palette"
import TerminalEgg from "@/components/terminal-egg"
import { site } from "@/lib/data"

export default function SiteExtras() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log(
      `%c${site.name}`,
      "font: 700 16px sans-serif",
      `\nVous lisez la console : bon réflexe.\nEssayez Ctrl+K, ou le code Konami.\n${site.email}`,
    )
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
      }
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <>
      <div
        ref={barRef}
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[90] h-0.5 origin-left bg-white/80"
        style={{ transform: "scaleX(0)" }}
      />
      <CommandPalette />
      <TerminalEgg />
    </>
  )
}
