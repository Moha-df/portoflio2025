"use client"

export default function ProfileHeader() {
  return (
    <header className="relative w-full bg-[#151312] pt-16 pb-14 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <a
          href="#stage"
          className="group inline-flex items-center gap-2.5 mb-10 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-[0.15em] text-white/90 transition-colors duration-300 hover:border-white/60 hover:bg-white/15"
        >
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex w-full h-full rounded-full bg-white opacity-75 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-white" />
          </span>
          En recherche de stage — Février 2027
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>

        <h1 className="mb-0">
          <span className="block leading-none mb-2" style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "clamp(48px, 8vw, 94px)",
            fontWeight: 1000,
            letterSpacing: "0em",
            lineHeight: "100%",
            color: "#ffffff",
          }}>
            DE FRANCESCHI
          </span>
          <span className="block leading-none" style={{
            fontFamily: "var(--font-family, 'Poppins', sans-serif)",
            fontSize: "clamp(48px, 8vw, 94px)",
            fontWeight: 1000,
            letterSpacing: "0em",
            lineHeight: "1.2em",
            textAlign: "start",
            color: "#B6B4BD",
            opacity: 0.33,
          }}>
            MOHAMED
          </span>
        </h1>

        <div className="mt-12 max-w-5xl">
          <p className="text-gray-300 text-2xl md:text-3xl lg:text-4xl leading-relaxed font-bold">
            Développeur passionné et rigoureux, je conçois des solutions technologiques avancées, en alliant expertise et innovation pour créer des projets performants et fiables. Étudiant en Master 2 à l&apos;Université de Haute-Alsace et gérant d&apos;une micro-entreprise, je mets mes compétences au service de projets concrets et ambitieux.
          </p>
        </div>
      </div>
    </header>
  )
}
