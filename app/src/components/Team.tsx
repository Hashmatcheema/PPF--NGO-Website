import type { Locale } from "@/data/content"
import { content } from "@/data/content"
import { images } from "@/data/images"

export function Team({ lang }: { lang: Locale }) {
  const t = content[lang].team
  const members = "members" in t ? t.members : []
  return (
    <section id="team" className="border-t border-[var(--color-border)] bg-[var(--color-surface)] py-24 md:py-32">
      <div className="wrap">
        <p className="font-display text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-text-muted)]">
          Team
        </p>
        <h2 className="font-display mt-4 text-3xl font-semibold text-[var(--color-text)] md:text-4xl">
          {t.title}
        </h2>
        <p className="mt-4 max-w-2xl text-[var(--color-text-muted)]">
          {t.intro}
        </p>
        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center"
            >
              <div className="relative h-40 w-40 overflow-hidden rounded-full border-2 border-[var(--color-border)] shadow-lg">
                <img
                  src={images[member.imageKey]}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="font-display mt-4 text-lg font-semibold text-[var(--color-text)]">
                {member.name}
              </h3>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
