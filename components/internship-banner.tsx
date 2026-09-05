"use client"

const facts = [
  { label: "Durée", value: "5 à 6 mois" },
  { label: "Période", value: "Février → Août 2027" },
  { label: "Démarrage", value: "Entre le 1er févr. et le 26 mars 2027" },
  { label: "Niveau", value: "Master 2 — Université de Haute-Alsace" },
]

const domains = [
  "Développement full stack",
  "Web",
  "Logiciel",
  "Mobile",
  "Jeu vidéo",
]

export default function InternshipBanner() {
  return (
    <section id="stage" className="w-full bg-[#151312] px-6 md:px-12 lg:px-20 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl border border-[#B6B4BD]/25 bg-white/[0.04] p-8 md:p-12">
          {/* Liseré d'accent */}
          <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 bg-white/70" />

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-white/90">
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex w-full h-full rounded-full bg-white opacity-75 animate-ping" />
                <span className="relative inline-flex w-2 h-2 rounded-full bg-white" />
              </span>
              Disponible
            </span>
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-white/50">
              Recherche de stage · 2027
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight max-w-4xl">
            À la recherche d&apos;un stage en développement informatique
          </h2>

          <p className="mt-5 text-lg md:text-xl text-white/65 leading-relaxed max-w-3xl">
            Stage de fin d&apos;études de Master 2 : développement full stack, web, logiciel, mobile
            ou jeu vidéo. Ce qui compte pour moi, c&apos;est une équipe et des projets où je peux
            vraiment coder et apprendre.
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {domains.map((domain) => (
              <li
                key={domain}
                className="rounded-full border border-[#B6B4BD]/25 px-3.5 py-1.5 text-sm font-medium text-[#B6B4BD]/85"
              >
                {domain}
              </li>
            ))}
          </ul>

          <dl className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-[#B6B4BD]/15 pt-8">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-xs font-bold uppercase tracking-[0.15em] text-[#B6B4BD]/50">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-base md:text-lg font-bold text-white">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-sm text-white/40">
            Convention à valider avant le 11 janvier 2027 pour un démarrage au 1<sup>er</sup> février,
            et avant le 5 mars 2027 pour un démarrage au 26 mars.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-base font-black text-[#0a0908] transition-colors duration-200 hover:bg-[#B6B4BD]"
            >
              Me proposer un stage
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#projets"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-[#B6B4BD]/30 px-6 py-3.5 text-base font-black text-white transition-colors duration-200 hover:border-white hover:bg-white/[0.06]"
            >
              Voir mes projets
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
