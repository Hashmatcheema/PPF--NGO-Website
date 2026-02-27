import { images } from "@/data/images"
import type { Locale } from "@/data/content"
import { content } from "@/data/content"
import { useCtasConfig } from "@/contexts/CtasContext"
import { JoinUsButton } from "@/components/JoinUsButton"

export function Hero({ lang }: { lang: Locale }) {
  const t = content[lang]
  const ctas = useCtasConfig()
  return (
    <section id="hero" className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={images.hero}
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div
          className="hero-overlay absolute inset-0"
          aria-hidden
        />
      </div>
      <div className="hero-content wrap relative z-10 pb-[20vh] pt-32">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.35em] text-[var(--color-accent)]">
          {t.siteName}
        </p>
        <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-[var(--color-text)] sm:text-5xl md:text-6xl lg:text-7xl">
          {ctas.heroCtaHeading[lang]}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-[var(--color-text-muted)]">
          {ctas.heroCtaSubtext[lang]}
        </p>
        <div className="mt-10">
          <JoinUsButton lang={lang} ctas={ctas} />
        </div>
      </div>
    </section>
  )
}
