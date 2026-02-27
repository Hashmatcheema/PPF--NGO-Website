import { images } from "@/data/images"
import type { Locale } from "@/data/content"
import { content } from "@/data/content"

export function Impact({ lang }: { lang: Locale }) {
  const t = content[lang].impact
  return (
    <section id="impact" className="bg-[var(--color-surface)] py-24 md:py-32">
      <div className="wrap">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
          Impact
        </p>
        <h2 className="font-display mt-4 text-3xl font-semibold text-[var(--color-text)] md:text-4xl">
          {t.title}
        </h2>
        <p className="mt-3 max-w-xl text-[var(--color-text-muted)]">{t.intro}</p>
        <div className="mt-16 grid grid-cols-3 gap-8 border-y border-[var(--color-border)] py-12 md:gap-16">
          {t.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <span className="font-display text-4xl font-bold text-[var(--color-accent)] md:text-5xl">
                {stat.value}
              </span>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-16 overflow-hidden rounded-lg">
          <img
            src={images.humanitarian}
            alt=""
            className="h-[280px] w-full object-cover md:h-[380px]"
          />
        </div>
      </div>
    </section>
  )
}
