"use client"

export default function ProfileHeader() {
  return (
    <div className="relative w-full bg-[#151312] py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
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
            Développeur passionné et rigoureux, je conçois des solutions technologiques avancées, en alliant expertise et innovation pour créer des projets performants et fiables. Étudiant en Master 1 à l'Université de Haute-Alsace et gérant d'une micro-entreprise, je mets mes compétences au service de projets concrets et ambitieux.
          </p>
        </div>
      </div>
    </div>
  )
}
