import type { Locale } from "@/data/content"
import { content } from "@/data/content"

export function About({ lang }: { lang: Locale }) {
  const t = content[lang].vision
  return (
    <section id="mission" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&q=80"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm"></div>
      </div>

      <div className="wrap relative z-10">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
          {content[lang].nav.mission}
        </p>
        <p className="font-display mt-4 max-w-2xl text-3xl font-semibold leading-snug text-white md:text-4xl">
          {t.intro}
        </p>
        <div className="mt-16 grid gap-12 border-t border-white/20 pt-16 md:grid-cols-3 md:gap-16">
          {t.cards.map((card, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-black/40 p-6 backdrop-blur-md transition hover:bg-black/60 shadow-xl">
              <span className="font-display text-2xl font-bold text-[var(--color-accent)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-white">
                {card.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
