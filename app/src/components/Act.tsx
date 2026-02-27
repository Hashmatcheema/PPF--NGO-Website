import { useState } from "react"
import type { Locale } from "@/data/content"
import { content } from "@/data/content"

export function Act({ lang }: { lang: Locale }) {
  const t = content[lang].contact
  const [showDonate, setShowDonate] = useState(false)

  return (
    <section id="act" className="py-24 md:py-32">
      <div className="wrap">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
          Get involved
        </p>
        <h2 className="font-display mt-4 text-3xl font-semibold text-[var(--color-text)] md:text-4xl">
          {t.intro}
        </h2>
        <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-12">
          <div
            id="volunteer"
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8"
          >
            <h3 className="font-display text-xl font-semibold text-[var(--color-text)]">
              {t.volunteer.title}
            </h3>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">{t.volunteer.body}</p>
            <a
              href="#contact"
              className="mt-6 inline-flex h-11 items-center justify-center rounded-md border border-[var(--color-accent)] px-6 text-sm font-semibold text-[var(--color-accent)] transition hover:bg-[var(--color-accent)] hover:text-[var(--color-bg)]"
            >
              {t.volunteer.cta}
            </a>
          </div>
          <div
            id="donate"
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-8"
          >
            <h3 className="font-display text-xl font-semibold text-[var(--color-text)]">
              {t.donate.title}
            </h3>
            <p className="mt-2 text-sm text-[var(--color-text-muted)]">{t.donate.body}</p>
            <button
              onClick={() => setShowDonate(true)}
              className="mt-6 inline-flex h-11 items-center justify-center rounded-md bg-[var(--color-accent)] px-6 text-sm font-semibold text-[var(--color-bg)] transition hover:bg-[var(--color-accent-hover)]"
            >
              {t.donate.cta}
            </button>
          </div>
        </div>
      </div>

      {showDonate && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowDonate(false)}
        >
          <div
            className="w-full max-w-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 font-display text-xl font-bold text-[var(--color-text)]">
              {lang === "en" ? "Bank Account Details" : "بینک اکاؤنٹ کی تفصیلات"}
            </h3>
            <div className="space-y-3 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] p-4 text-sm">
              <p>
                <span className="text-[var(--color-text-muted)]">Bank Name:</span> <br />
                <span className="font-semibold text-[var(--color-text)]">Dummy Bank Ltd.</span>
              </p>
              <p>
                <span className="text-[var(--color-text-muted)]">Account Title:</span> <br />
                <span className="font-semibold text-[var(--color-text)]">Pak-Palestine Forum</span>
              </p>
              <p>
                <span className="text-[var(--color-text-muted)]">Account No:</span> <br />
                <span className="font-semibold text-[var(--color-text)]">1234 5678 9012 3456</span>
              </p>
              <p>
                <span className="text-[var(--color-text-muted)]">IBAN:</span> <br />
                <span className="font-semibold text-[var(--color-text)]">PK00 DUMM 1234 5678 9012 3456</span>
              </p>
            </div>
            <button
              onClick={() => setShowDonate(false)}
              className="mt-6 w-full rounded-md bg-[var(--color-accent)] px-4 py-2.5 font-semibold text-[var(--color-bg)] transition hover:bg-[var(--color-accent-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              {lang === "en" ? "Close" : "بند کریں"}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
