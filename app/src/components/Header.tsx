import { useState, useEffect } from "react"
import { Menu, X, Sun, Moon } from "lucide-react"
import type { Locale } from "@/data/content"
import { content } from "@/data/content"
import type { Theme } from "@/App"
import { useCtasConfig } from "@/contexts/CtasContext"
import { JoinUsButton } from "@/components/JoinUsButton"

const links = [
  { id: "hero", key: "hero" as const },
  { id: "mission", key: "mission" as const },
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
  const [activeId, setActiveId] = useState("hero")
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
        }, 2500)
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY < 100) {
        setVisible(true)
        clearTimeout(timeoutId)
        if (window.scrollY > 50) {
          timeoutId = setTimeout(() => {
            if (e.clientY >= 100) setVisible(false)
          }, 2500)
        }
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-30% 0px -70% 0px" }
    )

    const sections = document.querySelectorAll("section[id], div[id='hero']")
    sections.forEach((s) => observer.observe(s))

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("mousemove", onMouseMove, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("mousemove", onMouseMove)
      sections.forEach((s) => observer.unobserve(s))
      observer.disconnect()
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

        <nav className="hidden lg:flex lg:items-center lg:gap-6 xl:gap-8">
          {links.map(({ id, key }) => {
            const isActive = activeId === id;
            if (id === 'hero') return null;
            return (
              <a
                key={id}
                href={`#${id}`}
                className={`text-sm transition ${isActive
                  ? "text-[var(--color-accent)] font-bold relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[var(--color-accent)]"
                  : solid
                    ? "font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                    : "font-medium text-white/80 hover:text-white"
                  }`}
              >
                {content[lang].nav[key as keyof typeof content[typeof lang]['nav']]}
              </a>
            )
          })}
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
            className={`relative flex h-8 w-[72px] shrink-0 items-center rounded-full p-1 shadow-inner transition-colors ${solid ? "bg-[var(--color-bg-elevated)] border border-[var(--color-border)]" : "bg-black/40 border border-white/10"}`}
            aria-label="Switch language"
          >
            <div className={`absolute flex h-6 w-8 items-center justify-center rounded-full bg-[var(--color-accent)] shadow-md transition-transform duration-300 ${lang === "ur" ? "translate-x-[34px]" : "translate-x-0"}`}>
              <span className="text-[10px] font-bold text-white leading-none">{lang === "en" ? "EN" : "اردو"}</span>
            </div>
            <div className={`flex w-full justify-between px-2 text-[10px] font-bold leading-none ${solid ? "text-[var(--color-text-muted)]" : "text-white/60"}`}>
              <span className={`transition-opacity duration-300 ${lang === "en" ? "opacity-0" : "opacity-100"}`}>EN</span>
              <span className={`transition-opacity duration-300 ${lang === "ur" ? "opacity-0" : "opacity-100"}`}>اردو</span>
            </div>
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
        <>
          <div
            className="fixed inset-0 top-16 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-50 border-t border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-6 shadow-xl md:hidden">
            <nav className="flex flex-col gap-1">
              {links.map(({ id, key }) => {
                if (id === 'hero') return null;
                const isActive = activeId === id;
                return (
                  <a
                    key={id}
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className={`rounded-md px-3 py-2.5 text-sm transition ${isActive
                      ? "font-bold text-[var(--color-accent)] bg-[var(--color-surface)]"
                      : "font-medium text-[var(--color-text)] hover:bg-[var(--color-surface)]"
                      }`}
                  >
                    {content[lang].nav[key as keyof typeof content[typeof lang]['nav']]}
                  </a>
                )
              })}
              <div className="mt-4" onClick={() => setOpen(false)}>
                <JoinUsButton lang={lang} ctas={ctas} className="w-full justify-center py-3" />
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  )
}
