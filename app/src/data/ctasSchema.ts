/**
 * CTA config schema — matches server API (GET/PUT /api/ctas).
 * Client can change labels and joinUrl without code deploy.
 */
export type LocaleLabel = { en: string; ur: string }

export interface CtasConfig {
  joinUrl: string
  joinLabel: LocaleLabel
  contactLabel: LocaleLabel
  heroCtaHeading: LocaleLabel
  heroCtaSubtext: LocaleLabel
  volunteerLabel: LocaleLabel
  donateLabel: LocaleLabel
}

/** Bundled default used when API is unavailable or returns invalid data */
export const defaultCtas: CtasConfig = {
  joinUrl: "",
  joinLabel: { en: "Join Us", ur: "شامل ہوں" },
  contactLabel: { en: "Contact Us", ur: "رابطہ کریں" },
  heroCtaHeading: { en: "Stand in Solidarity.", ur: "یکجہتی میں کھڑے ہوں۔" },
  heroCtaSubtext: {
    en: "Add your voice. Join thousands making a difference.",
    ur: "اپنی آواز شامل کریں۔ ہزاروں کے ساتھ فرق بنائیں۔",
  },
  volunteerLabel: { en: "Volunteer", ur: "رضاکار" },
  donateLabel: { en: "Donate", ur: "عطیہ" },
}

function isLocaleLabel(x: unknown): x is LocaleLabel {
  return (
    typeof x === "object" &&
    x !== null &&
    typeof (x as LocaleLabel).en === "string" &&
    typeof (x as LocaleLabel).ur === "string"
  )
}

export function parseCtas(raw: unknown): CtasConfig | null {
  if (!raw || typeof raw !== "object") return null
  const o = raw as Record<string, unknown>
  if (
    !isLocaleLabel(o.joinLabel) ||
    !isLocaleLabel(o.contactLabel) ||
    !isLocaleLabel(o.heroCtaHeading) ||
    !isLocaleLabel(o.heroCtaSubtext) ||
    !isLocaleLabel(o.volunteerLabel) ||
    !isLocaleLabel(o.donateLabel)
  ) {
    return null
  }
  return {
    joinUrl: typeof o.joinUrl === "string" ? o.joinUrl : "",
    joinLabel: o.joinLabel,
    contactLabel: o.contactLabel,
    heroCtaHeading: o.heroCtaHeading,
    heroCtaSubtext: o.heroCtaSubtext,
    volunteerLabel: o.volunteerLabel,
    donateLabel: o.donateLabel,
  }
}
