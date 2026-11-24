import SiteLinks from "@/components/site-links"

const nav = [
  { label: "Stage", href: "#stage" },
  { label: "Projets", href: "#projets" },
  { label: "Compétences", href: "#competences" },
  { label: "Contact", href: "#contact" },
]

const displayStyle = {
  fontFamily: "var(--font-geist-sans), sans-serif",
  fontSize: "clamp(34px, 8vw, 84px)",
  fontWeight: 800,
  letterSpacing: "-0.04em",
  lineHeight: 1,
} as const

export default function ProfileHeader() {
  return (
    <header className="w-full bg-[#151312] px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <nav
          aria-label="Navigation principale"
          className="flex items-center justify-between gap-6 border-b border-[#B6B4BD]/15 py-5"
        >
          <span className="font-mono text-sm text-white/70">moha-df.fr</span>
          <ul className="flex items-center gap-5 md:gap-8 text-sm font-medium text-white/60">
            {nav.map((item) => (
              <li key={item.href} className={item.href === "#contact" ? undefined : "hidden sm:block"}>
                <a href={item.href} className="transition-colors duration-200 hover:text-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="pt-16 pb-16 md:pt-24 md:pb-20">
          <a
            href="#stage"
            className="group inline-flex items-center gap-2.5 mb-10 font-mono text-xs md:text-sm uppercase tracking-[0.12em] text-white/70 transition-colors duration-200 hover:text-white"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-white opacity-75 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-white" />
            </span>
            En recherche de stage — Février 2027
            <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </a>

          <h1>
            <span className="block text-white" style={displayStyle}>
              DE FRANCESCHI
            </span>
            <span className="block mt-1 md:mt-2 text-[#B6B4BD]/35" style={displayStyle}>
              MOHAMED
            </span>
          </h1>

          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <p className="max-w-2xl text-xl md:text-2xl leading-relaxed text-white/75">
              Développeur full stack, étudiant en Master 2 informatique à l&apos;Université de
              Haute-Alsace et gérant d&apos;une micro-entreprise. Je conçois des applications web,
              mobiles et des jeux vidéo, pour des clients comme en projet universitaire.
            </p>
            <SiteLinks />
          </div>
        </div>
      </div>
    </header>
  )
}
