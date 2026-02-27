import type { Locale } from "@/data/content"
import { content } from "@/data/content"

export function Footer({ lang }: { lang: Locale }) {
  const t = content[lang]
  return (
    <footer className="border-t border-[var(--color-border)] py-12">
      <div className="wrap flex flex-col items-center gap-4 text-center md:flex-row md:justify-between md:text-left">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-xl font-bold text-[var(--color-text)]">PPF</span>
          <span className="text-sm text-[var(--color-text-muted)]">{t.siteName}</span>
        </div>
        <p className="text-sm text-[var(--color-text-muted)]">{t.footer.tagline}</p>
        <nav className="flex gap-6 text-sm text-[var(--color-text-muted)]">
          <a href="#about" className="hover:text-[var(--color-text)]">About</a>
          <a href="#impact" className="hover:text-[var(--color-text)]">Impact</a>
          <a href="#act" className="hover:text-[var(--color-text)]">Get involved</a>
          <a href="#faq" className="hover:text-[var(--color-text)]">FAQ</a>
          <a href="#contact" className="hover:text-[var(--color-text)]">Contact</a>
        </nav>
      </div>
      <div className="wrap mt-8 border-t border-[var(--color-border)] pt-8 text-center text-xs text-[var(--color-text-muted)]">
        © {new Date().getFullYear()} Pak-Palestine Forum
      </div>
    </footer>
  )
}
