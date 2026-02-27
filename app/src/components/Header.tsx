import { useState, useEffect } from "react"
import { Menu, X, Sun, Moon } from "lucide-react"
import type { Locale } from "@/data/content"
import { content } from "@/data/content"
import type { Theme } from "@/App"
import { useCtasConfig } from "@/contexts/CtasContext"
import { JoinUsButton } from "@/components/JoinUsButton"

const links = [
  { id: "about", key: "mission" as const },
  { id: "presence", key: "where" as const },
  { id: "impact", key: "impact" as const },
  { id: "act", key: "act" as const },
  { id: "faq", key: "faq" as const },
  { id: "team", key: "team" as const },
  { id: "contact", key: "contact" as const },
]

export function Header({
  lang,
  setLang,
  theme,
  setTheme,
}: {
  lang: Locale
  setLang: (l: Locale) => void
  theme: Theme
  setTheme: (t: Theme) => void
}) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const ctas = useCtasConfig()

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>
    const onScroll = () => {
      setScrolled(window.scrollY > 50)
      setVisible(true)
      clearTimeout(timeoutId)

      if (window.scrollY > 50) {
        timeoutId = setTimeout(() => {
          setVisible(false)
        }, 1500)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      clearTimeout(timeoutId)
    }
  }, [])

  const solid = scrolled

  // If hovering over header, keep it visible
  return (
    <header
      onMouseEnter={() => setVisible(true)}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${solid ? "bg-[var(--color-bg)]/95 backdrop-blur-md border-b border-[var(--color-border)]" : "bg-black/20 backdrop-blur-md"
        } ${!visible && !open ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="wrap flex h-16 items-center justify-between md:h-18">
        <a
          href="#hero"
          className={`font-display text-lg font-bold ${solid ? "text-[var(--color-text)]" : "text-white"}`}
        >
          PPF
        </a>

        <nav className="hidden md:flex md:items-center md:gap-8">
          {links.map(({ id, key }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`text-sm font-medium transition hover:opacity-80 ${solid ? "text-[var(--color-text-muted)] hover:text-[var(--color-text)]" : "text-white/80 hover:text-white"
                }`}
            >
              {content[lang].nav[key]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded ${solid ? "text-[var(--color-text-muted)] hover:text-[var(--color-text)]" : "text-white/80 hover:text-white"
              }`}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            type="button"
            onClick={() => setLang(lang === "en" ? "ur" : "en")}
            className={`flex h-10 w-10 shrink-0 items-center justify-center text-xs font-medium uppercase tracking-wider ${solid ? "text-[var(--color-text-muted)]" : "text-white/60"
              } hover:opacity-100`}
            aria-label="Switch language"
          >
            {lang === "en" ? "EN" : "اردو"}
          </button>
          <JoinUsButton
            lang={lang}
            ctas={ctas}
            variant="header"
            solid={solid}
          />

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className={`inline-flex h-10 w-10 items-center justify-center rounded md:hidden ${solid ? "text-[var(--color-text)]" : "text-white"
              }`}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-6 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map(({ id, key }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)]"
              >
                {content[lang].nav[key]}
              </a>
            ))}
            <div className="mt-4" onClick={() => setOpen(false)}>
              <JoinUsButton lang={lang} ctas={ctas} className="w-full justify-center py-3" />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
