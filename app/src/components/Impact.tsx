import { images } from "@/data/images"
import type { Locale } from "@/data/content"
import { content } from "@/data/content"

export function Impact({ lang }: { lang: Locale }) {
  const t = content[lang].impact
  return (
    <section id="impact" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute inset-0 z-0">
        <img
          src={images.humanitarian}
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]"></div>
      </div>

      <div className="wrap relative z-10">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
          Impact
        </p>
        <h2 className="font-display mt-4 text-3xl font-semibold text-white md:text-4xl">
          {t.title}
        </h2>
        <p className="mt-3 max-w-xl text-white/80">{t.intro}</p>
        <div className="mt-16 grid grid-cols-3 gap-8 border-y border-[var(--color-border)] py-12 md:gap-16">
          {t.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <span className="font-display text-4xl font-bold text-[var(--color-accent)] md:text-5xl">
                {stat.value}
              </span>
              <p className="mt-2 text-xs font-medium uppercase tracking-wider text-white/70">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
