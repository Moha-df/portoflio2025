"use client"

import Link from "next/link"

import { projects } from "@/lib/projects"

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

export default function ProjectsList() {
  return (
    <section id="projets" className="w-full bg-[#151312] py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="mb-6">
          <span className="block leading-none mb-2" style={titleStyle}>
            PROJETS
          </span>
          <span className="block leading-none" style={subTitleStyle}>
            RÉALISÉS
          </span>
        </h2>

        <p className="text-white/50 text-base md:text-lg mb-12 max-w-2xl">
          {projects.length} projets, du client réel au projet universitaire — web, mobile, jeu vidéo
          et sécurité. Cliquez sur un projet pour lire son détail.
        </p>

        <ul className="border-t border-[#B6B4BD]/15">
          {projects.map((project, index) => (
            <li key={project.slug} className="border-b border-[#B6B4BD]/15">
              <Link
                href={`/projets/${project.slug}`}
                className="group grid grid-cols-[auto_1fr_auto] items-start gap-4 md:gap-8 py-7 md:py-8 px-2 md:px-4 -mx-2 md:-mx-4 rounded-lg transition-colors duration-300 hover:bg-white/[0.04] focus:outline-none focus-visible:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <span className="font-mono text-sm md:text-base text-[#B6B4BD]/40 pt-1 md:pt-2 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h3
                      className={`font-black text-white group-hover:text-[#B6B4BD] transition-colors duration-300 leading-tight ${
                        project.featured ? "text-3xl md:text-5xl" : "text-2xl md:text-4xl"
                      }`}
                    >
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white/90">
                        Projet phare
                      </span>
                    )}
                    {project.live && (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white/90">
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        En ligne
                      </span>
                    )}
                  </div>

                  <p className="mt-2 text-xs md:text-sm font-bold uppercase tracking-[0.12em] text-[#B6B4BD]/45">
                    {project.context} · {project.year}
                  </p>

                  <p className="mt-3 text-base md:text-lg text-white/60 leading-relaxed max-w-3xl">
                    {project.tagline}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-[#B6B4BD]/25 px-3 py-1 text-xs md:text-sm font-medium text-[#B6B4BD]/80"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm md:text-base font-bold text-white/50 group-hover:text-white transition-colors duration-300">
                    Voir le projet
                    <span
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </div>

                <span
                  aria-hidden="true"
                  className="pt-1 md:pt-2 text-[#B6B4BD]/40 transition-all duration-300 group-hover:text-white group-hover:translate-x-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6 md:w-8 md:h-8"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <a
          href="https://github.com/Moha-df"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 inline-flex items-center gap-2 text-base md:text-lg font-bold text-white/70 hover:text-white transition-colors duration-300"
        >
          Voir tous mes dépôts sur GitHub
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  )
}
