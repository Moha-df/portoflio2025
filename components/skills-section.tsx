"use client"

import { skillGroups } from "@/lib/data"
import ThreeList from "@/components/3list"

const titleStyle = {
  fontFamily: "'Poppins', sans-serif",
  fontSize: "clamp(48px, 8vw, 94px)",
  fontWeight: 1000,
  letterSpacing: "0em",
  lineHeight: "100%",
  color: "#ffffff",
} as const

const subTitleStyle = {
  fontFamily: "var(--font-family, 'Poppins', sans-serif)",
  fontSize: "clamp(48px, 8vw, 94px)",
  fontWeight: 1000,
  letterSpacing: "0em",
  lineHeight: "1.2em",
  textAlign: "start",
  color: "#B6B4BD",
  opacity: 0.33,
} as const

export default function SkillsSection() {
  const marqueeItems = skillGroups.flatMap((group) =>
    group.items.map((item) => ({ name: item.name.toUpperCase(), url: item.url })),
  )

  return (
    <section id="competences" className="w-full bg-[#151312] pt-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="mb-6">
          <span className="block leading-none mb-2" style={titleStyle}>
            COMPÉTENCES
          </span>
          <span className="block leading-none" style={subTitleStyle}>
            TECHNIQUES
          </span>
        </h2>

        <p className="text-white/50 text-base md:text-lg mb-12 max-w-2xl">
          Les technologies que j&apos;utilise au quotidien, en projet universitaire comme en
          micro-entreprise.
        </p>

        <div className="divide-y divide-[#B6B4BD]/15 border-y border-[#B6B4BD]/15">
          {skillGroups.map((group) => (
            <div
              key={group.label}
              className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4 md:gap-10 py-7"
            >
              <h3 className="text-sm md:text-base font-bold uppercase tracking-[0.15em] text-[#B6B4BD]/60">
                {group.label}
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-full border border-[#B6B4BD]/25 px-4 py-2 text-sm md:text-base font-medium text-white/85 transition-colors duration-300 hover:border-white/70 hover:bg-white/[0.06] hover:text-white"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bandeau décoratif : les mêmes technologies en fond animé */}
      <div className="-mt-4">
        <ThreeList items={marqueeItems} backgroundColor="#151312" />
      </div>
    </section>
  )
}
