import SiteLinks from "@/components/site-links"
import { site } from "@/lib/data"

export default function SiteFooter() {
  return (
    <footer className="w-full bg-[#151312] px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 border-t border-[#B6B4BD]/15 pt-10 pb-24 md:flex-row md:items-center md:justify-between">
        <p className="font-mono text-sm text-white/40">
          © {new Date().getFullYear()} {site.name}
        </p>
        <SiteLinks />
      </div>
    </footer>
  )
}
