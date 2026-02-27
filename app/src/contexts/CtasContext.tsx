import { createContext, useContext } from "react"
import type { CtasConfig } from "@/data/ctasSchema"
import { useCtas } from "@/hooks/useCtas"

const CtasContext = createContext<CtasConfig | null>(null)

export function CtasProvider({ children }: { children: React.ReactNode }) {
  const { ctas } = useCtas()
  return <CtasContext.Provider value={ctas}>{children}</CtasContext.Provider>
}

export function useCtasConfig(): CtasConfig {
  const ctas = useContext(CtasContext)
  if (!ctas) throw new Error("useCtasConfig must be used within CtasProvider")
  return ctas
}
