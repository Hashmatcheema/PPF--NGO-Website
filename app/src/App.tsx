import { useState, useEffect } from "react"
import { CtasProvider } from "@/contexts/CtasContext"
import { Header } from "@/components/Header"
import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { WhereWeExist } from "@/components/WhereWeExist"
import { Impact } from "@/components/Impact"
import { Act } from "@/components/Act"
import { FAQ } from "@/components/FAQ"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"
import { Team } from "@/components/Team"
import type { Locale } from "@/data/content"

export type Theme = "light" | "dark"

const SEO_TITLES: Record<Locale, string> = {
  en: "Pak-Palestine Forum — Stand in Solidarity",
  ur: "پاک فلسطین فورم — یکجہتی میں کھڑے ہوں۔",
}
const SEO_DESCRIPTIONS: Record<Locale, string> = {
  en: "Pak-Palestine Forum — Standing in solidarity. Justice, relief, and lasting change.",
  ur: "پاک فلسطین فورم — یکجہتی میں کھڑے ہوں۔ انصاف، امداد اور پائیدار تبدیلی۔",
}

function App() {
  const [lang, setLang] = useState<Locale>(() => {
    try {
      return (localStorage.getItem("ppf-lang") === "ur" ? "ur" : "en") as Locale
    } catch {
      return "en"
    }
  })

  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem("ppf-theme")
      return (stored === "light" || stored === "dark" ? stored : "light") as Theme
    } catch {
      return "light"
    }
  })

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = "ltr"
  }, [lang])

  useEffect(() => {
    document.title = SEO_TITLES[lang]
    const meta = document.getElementById("meta-description") as HTMLMetaElement | null
    if (meta) meta.content = SEO_DESCRIPTIONS[lang]
  }, [lang])

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  useEffect(() => {
    try {
      localStorage.setItem("ppf-lang", lang)
    } catch { }
  }, [lang])

  useEffect(() => {
    try {
      localStorage.setItem("ppf-theme", theme)
    } catch { }
  }, [theme])

  return (
    <CtasProvider>
      <div className="min-h-screen bg-[var(--color-bg)]">
        <Header lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} />
        <main>
          <Hero lang={lang} />
          <About lang={lang} />
          <WhereWeExist lang={lang} />
          <Impact lang={lang} />
          <Act lang={lang} />
          <FAQ lang={lang} />
          <Team lang={lang} />
          <Contact lang={lang} />
          <Footer lang={lang} />
        </main>
      </div>
    </CtasProvider>
  )
}

export default App
