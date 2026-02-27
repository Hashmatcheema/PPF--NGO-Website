import { useState, useEffect } from "react"
import { defaultCtas, parseCtas, type CtasConfig } from "@/data/ctasSchema"

const API_URL = import.meta.env.VITE_CTAS_API_URL ?? ""

export function useCtas(): { ctas: CtasConfig; loading: boolean } {
  const [ctas, setCtas] = useState<CtasConfig>(defaultCtas)
  const [loading, setLoading] = useState(!!API_URL)

  useEffect(() => {
    if (!API_URL) {
      setLoading(false)
      return
    }
    const url = API_URL.replace(/\/$/, "") + "/api/ctas"
    fetch(url, { method: "GET" })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Failed to fetch"))))
      .then((data) => {
        const parsed = parseCtas(data)
        if (parsed) setCtas(parsed)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return { ctas, loading }
}
