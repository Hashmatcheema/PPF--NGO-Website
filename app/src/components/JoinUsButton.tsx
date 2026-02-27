import { useState } from "react"
import type { Locale } from "@/data/content"
import type { CtasConfig } from "@/data/ctasSchema"
import { cn } from "@/lib/utils"

const fallbackMessage: Record<Locale, string> = {
  en: "Form temporarily unavailable.",
  ur: "فورم عارضی طور پر دستیاب نہیں۔",
}

type JoinUsButtonProps = {
  lang: Locale
  ctas: CtasConfig
  className?: string
  variant?: "primary" | "header"
  /** When variant is header: true = scrolled (solid bg), false = transparent */
  solid?: boolean
}

export function JoinUsButton({ lang, ctas, className, variant = "primary", solid = false }: JoinUsButtonProps) {
  const [showFallback, setShowFallback] = useState(false)
  const hasJoinUrl = Boolean(ctas.joinUrl?.trim())

  const handleClick = (e: React.MouseEvent) => {
    if (!hasJoinUrl) {
      e.preventDefault()
      setShowFallback(true)
    }
  }

  const scrollToContact = () => {
    setShowFallback(false)
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
  }

  const label = ctas.joinLabel[lang]
  const contactLabel = ctas.contactLabel[lang]

  const baseClass =
    variant === "header"
      ? "hidden rounded-md px-4 py-2 text-sm font-medium md:inline-block"
      : "inline-flex h-12 items-center justify-center rounded-md bg-[var(--color-accent)] px-8 font-semibold text-[var(--color-bg)] transition hover:bg-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"

  const headerVariantClass =
    variant === "header"
      ? solid
        ? "bg-[var(--color-accent)] text-[var(--color-bg)] hover:bg-[var(--color-accent-hover)]"
        : "bg-white/10 text-white hover:bg-white/20"
      : ""

  return (
    <>
      {hasJoinUrl ? (
        <a
          href={ctas.joinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(baseClass, headerVariantClass, className)}
        >
          {label}
        </a>
      ) : (
        <button
          type="button"
          onClick={handleClick}
          className={cn(baseClass, headerVariantClass, className)}
        >
          {label}
        </button>
      )}

      {showFallback && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="join-fallback-title"
          onClick={() => setShowFallback(false)}
        >
          <div
            className="max-w-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p id="join-fallback-title" className="font-medium text-[var(--color-text)]">
              {fallbackMessage[lang]}
            </p>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">
              {lang === "en"
                ? "Use the button below to reach us instead."
                : "نیچے والے بٹن سے ہم سے رابطہ کریں۔"}
            </p>
            <button
              type="button"
              onClick={scrollToContact}
              className="mt-6 w-full rounded-md bg-[var(--color-accent)] px-4 py-2.5 font-semibold text-[var(--color-bg)] transition hover:bg-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {contactLabel}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
