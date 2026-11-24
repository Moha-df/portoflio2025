import { site } from "@/lib/data"

const links = [
  { label: site.email, href: `mailto:${site.email}`, external: false },
  { label: "GitHub", href: site.github, external: true },
  { label: "LinkedIn", href: site.linkedin, external: true },
].filter((link) => link.href)

export default function SiteLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-8 gap-y-3 ${className}`}>
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group inline-flex items-baseline gap-1.5 text-base md:text-lg font-medium text-white underline decoration-white/25 underline-offset-[6px] transition-colors duration-200 hover:decoration-white"
          >
            {link.label}
            {link.external && (
              <span aria-hidden="true" className="text-white/40 transition-colors duration-200 group-hover:text-white">
                ↗
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  )
}
