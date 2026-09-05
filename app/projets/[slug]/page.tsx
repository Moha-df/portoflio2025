import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import ChatbotWidget from "@/components/chatbot-widget"
import { getProject, projects } from "@/lib/projects"

const titleStyle = {
  fontFamily: "'Poppins', sans-serif",
  fontSize: "clamp(38px, 6.5vw, 78px)",
  fontWeight: 1000,
  letterSpacing: "0em",
  lineHeight: "100%",
  color: "#ffffff",
} as const

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) {
    return { title: "Projet introuvable — Mohamed De Franceschi" }
  }

  return {
    title: `${project.title} — Mohamed De Franceschi`,
    description: project.tagline,
    alternates: { canonical: `/projets/${project.slug}` },
    openGraph: {
      type: "article",
      locale: "fr_FR",
      url: `https://www.moha-df.fr/projets/${project.slug}`,
      title: `${project.title} — Mohamed De Franceschi`,
      description: project.tagline,
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) {
    notFound()
  }

  const index = projects.findIndex((item) => item.slug === project.slug)
  const previous = index > 0 ? projects[index - 1] : null
  const next = index < projects.length - 1 ? projects[index + 1] : null

  return (
    <main className="min-h-screen bg-[#151312] overflow-x-hidden">
      <article className="px-6 md:px-12 lg:px-20 py-14 md:py-20">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/#projets"
            className="group inline-flex items-center gap-2 text-sm md:text-base font-bold text-white/50 hover:text-white transition-colors duration-300"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            >
              ←
            </span>
            Retour aux projets
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            {project.featured && (
              <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-[11px] md:text-xs font-bold uppercase tracking-[0.15em] text-white/90">
                Projet phare
              </span>
            )}
            {project.live && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-[11px] md:text-xs font-bold uppercase tracking-[0.15em] text-white/90">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                En ligne
              </span>
            )}
            <span className="text-[11px] md:text-xs font-bold uppercase tracking-[0.15em] text-white/40">
              {project.context} · {project.year}
            </span>
          </div>

          <h1 className="mt-6" style={titleStyle}>
            {project.title}
          </h1>

          <p className="mt-8 text-xl md:text-2xl text-white/70 leading-relaxed font-medium">
            {project.intro}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-[#B6B4BD]/25 px-3.5 py-1.5 text-sm font-medium text-[#B6B4BD]/85"
              >
                {tag}
              </li>
            ))}
          </ul>

          <dl className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7 border-y border-[#B6B4BD]/15 py-9">
            {project.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs font-bold uppercase tracking-[0.15em] text-[#B6B4BD]/50">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-base md:text-lg font-bold text-white">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 space-y-14">
            {project.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl md:text-3xl font-black text-white">{section.heading}</h2>

                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-5 text-lg text-white/65 leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.bullets && (
                  <ul className="mt-6 space-y-3.5">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-4 text-lg text-white/65 leading-relaxed">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 w-1.5 h-1.5 shrink-0 rounded-full bg-[#B6B4BD]/50"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <section className="mt-16 border-t border-[#B6B4BD]/15 pt-10">
            <h2 className="text-sm font-bold uppercase tracking-[0.15em] text-[#B6B4BD]/50">
              {project.links.length > 1 ? "Liens du projet" : "Lien du projet"}
            </h2>
            <div className="mt-6 flex flex-wrap gap-4">
              {project.links.map((link, linkIndex) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    linkIndex === 0
                      ? "inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-base font-black text-[#0a0908] transition-colors duration-200 hover:bg-[#B6B4BD]"
                      : "inline-flex items-center gap-2 rounded-lg border-2 border-[#B6B4BD]/30 px-6 py-3.5 text-base font-black text-white transition-colors duration-200 hover:border-white hover:bg-white/[0.06]"
                  }
                >
                  {link.label}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </section>

          <nav className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#B6B4BD]/15 pt-10">
            {previous ? (
              <Link
                href={`/projets/${previous.slug}`}
                className="group rounded-lg border border-[#B6B4BD]/20 p-5 transition-colors duration-300 hover:border-white/50 hover:bg-white/[0.04]"
              >
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#B6B4BD]/50">
                  ← Projet précédent
                </span>
                <span className="mt-2 block text-lg font-black text-white group-hover:text-[#B6B4BD] transition-colors duration-300">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}

            {next && (
              <Link
                href={`/projets/${next.slug}`}
                className="group rounded-lg border border-[#B6B4BD]/20 p-5 text-right transition-colors duration-300 hover:border-white/50 hover:bg-white/[0.04] sm:col-start-2"
              >
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#B6B4BD]/50">
                  Projet suivant →
                </span>
                <span className="mt-2 block text-lg font-black text-white group-hover:text-[#B6B4BD] transition-colors duration-300">
                  {next.title}
                </span>
              </Link>
            )}
          </nav>

          <div className="mt-16 rounded-2xl border border-[#B6B4BD]/25 bg-white/[0.04] p-8 md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/90">
              Recherche de stage · 2027
            </p>
            <p className="mt-4 text-xl md:text-2xl font-black text-white leading-snug">
              Ce projet vous parle&nbsp;? Je cherche un stage de développement de 5 à 6 mois à
              partir de février 2027.
            </p>
            <Link
              href="/#contact"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-base font-black text-[#0a0908] transition-colors duration-200 hover:bg-[#B6B4BD]"
            >
              Me contacter
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </article>

      <ChatbotWidget />
    </main>
  )
}
