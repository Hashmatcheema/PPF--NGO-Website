import type { Locale } from "@/data/content"
import { content } from "@/data/content"

export function Footer({ lang }: { lang: Locale }) {
  const t = content[lang]
  return (
    <footer className="bg-[#0a0e0c] border-t border-white/10 py-12">
      <div className="wrap flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-center gap-4">
          <img src="/images/PPF-logo.jpg" alt="PPF Logo" className="h-12 w-auto rounded-md object-contain" />
          <div className="flex flex-col items-start gap-0.5">
            <span className="font-display text-xl font-bold text-white">PPF</span>
            <span className="text-sm text-white/70">{t.siteName}</span>
          </div>
        </div>
        <p className="text-sm text-white/70">{t.footer.tagline}</p>
        <nav className="flex gap-6 text-sm text-white/70">
          <a href="#about" className="transition-colors hover:text-white">About</a>
          <a href="#impact" className="transition-colors hover:text-white">Impact</a>
          <a href="#act" className="transition-colors hover:text-white">Get involved</a>
          <a href="#faq" className="transition-colors hover:text-white">FAQ</a>
          <a href="#contact" className="transition-colors hover:text-white">Contact</a>
        </nav>
      </div>
      <div className="wrap mt-8 border-t border-white/10 pt-8 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Pak-Palestine Forum
      </div>
    </footer>
  )
}
