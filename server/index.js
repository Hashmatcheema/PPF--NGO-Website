import express from "express"
import cors from "cors"
import { readFile, writeFile, mkdir } from "fs/promises"
import { dirname, join } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = process.env.PPF_DATA_DIR || join(__dirname, "data")
const CTAS_PATH = join(DATA_DIR, "ctas.json")
const SUBMISSIONS_PATH = join(DATA_DIR, "submissions.json")
const PORT = process.env.PORT || 3001
const API_KEY = process.env.PPF_API_KEY || ""

const app = express()
app.use(cors({ origin: true }))
app.use(express.json({ limit: "10kb" }))

async function readCtas() {
  try {
    const raw = await readFile(CTAS_PATH, "utf-8")
    return JSON.parse(raw)
  } catch (err) {
    if (err.code === "ENOENT") {
      const defaultCtas = {
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
      await mkdir(DATA_DIR, { recursive: true })
      await writeFile(CTAS_PATH, JSON.stringify(defaultCtas, null, 2))
      return defaultCtas
    }
    throw err
  }
}

function requireApiKey(req, res, next) {
  if (!API_KEY) return next()
  const key = req.get("x-api-key") || req.query.apiKey
  if (key !== API_KEY) {
    return res.status(401).json({ error: "Unauthorized" })
  }
  next()
}

/** GET /api/ctas — returns current CTA config (public) */
app.get("/api/ctas", async (req, res) => {
  try {
    const ctas = await readCtas()
    res.json(ctas)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to read CTA config" })
  }
})

/** PUT /api/ctas — update CTA config (optional API key in production) */
app.put("/api/ctas", requireApiKey, async (req, res) => {
  try {
    const body = req.body
    if (!body || typeof body !== "object") {
      return res.status(400).json({ error: "JSON body required" })
    }
    const current = await readCtas()
    const merged = { ...current, ...body }
    await mkdir(DATA_DIR, { recursive: true })
    await writeFile(CTAS_PATH, JSON.stringify(merged, null, 2))
    res.json(merged)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to write CTA config" })
  }
})

/** POST /api/contact — contact form submission (honeypot: reject if "website" field is set) */
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message, website } = req.body || {}
    if (website && String(website).trim()) {
      return res.status(400).json({ error: "Invalid submission" })
    }
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" })
    }
    const entry = {
      name: String(name).slice(0, 200),
      email: String(email).slice(0, 254),
      message: String(message).slice(0, 5000),
      at: new Date().toISOString(),
    }
    let list = []
    try {
      const raw = await readFile(SUBMISSIONS_PATH, "utf-8")
      list = JSON.parse(raw)
    } catch {
      // file missing or invalid
    }
    list.push(entry)
    await mkdir(DATA_DIR, { recursive: true })
    await writeFile(SUBMISSIONS_PATH, JSON.stringify(list, null, 2))
    res.status(201).json({ ok: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to save submission" })
  }
})

app.listen(PORT, () => {
  console.log(`PPF CTA API listening on port ${PORT}`)
  console.log(`  GET  http://localhost:${PORT}/api/ctas`)
  console.log(`  PUT  http://localhost:${PORT}/api/ctas`)
})
