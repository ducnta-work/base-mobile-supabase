#!/usr/bin/env bun
import { promises as fs } from "fs"
import * as path from "path"

const SRC_DIR = "src/assets"
const ASSETS_DIR = path.resolve(SRC_DIR)
const OUT_JSON = path.resolve(SRC_DIR, "manifest.json")
const OUT_TS = path.resolve(SRC_DIR, "index.ts")
const exts = new Set([
  ".png",
  ".jpg",
  ".jpeg",
  ".webp",
  ".gif",
  ".svg",
  ".json",
  ".lottie",
])

function toKey(parts: string[]) {
  return parts.join(".").replace(/\.{2,}/g, ".")
}
function tsKey(k: string) {
  return JSON.stringify(k) // giữ nguyên dấu chấm trong key
}

async function walk(dir: string, acc: string[] = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) await walk(p, acc)
    else {
      const ext = path.extname(e.name)
      if (!exts.has(ext)) continue
      const rel = path.relative(ASSETS_DIR, p).split(path.sep) // ["fruits","mango.png"]
      const stem = path.basename(rel.at(-1)!, ext) // "mango"
      const parts = [...rel.slice(0, -1), stem] // ["fruits","mango"]
      acc.push(toKey(parts)) // "fruits.mango"
    }
  }
  return acc.sort()
}

async function main() {
  const keys = await walk(ASSETS_DIR)

  // JSON: { "fruits.mango": "./fruits/mango.png", ... }
  const json: Record<string, string> = {}
  for (const k of keys) {
    const p = "./" + k.replace(/\./g, "/") + ".*" // chỉ để tham khảo
    json[k] = p
  }
  await fs.writeFile(OUT_JSON, JSON.stringify(json, null, 2), "utf8")

  // TS nhỏ: MAP tĩnh với require() cố định + namespace Assets
  const lines: string[] = []
  lines.push("// prettier-ignore")
  lines.push("// Auto-generated. Do not edit.")
  lines.push("// Run: bun scripts/genAssets.ts\n")
  lines.push("const MAP = {")
  for (const k of keys) {
    // tạo đường dẫn thật có đuôi file
    // tìm file đúng đuôi đang có
    const fsPathNoExt = path.resolve(ASSETS_DIR, k.replace(/\./g, "/"))
    const dir = path.dirname(fsPathNoExt)
    const base = path.basename(fsPathNoExt)
    const candidates = await fs.readdir(dir)
    const hit = candidates.find((f) => f.startsWith(base + "."))
    if (!hit) continue
    const relRequire =
      "./" +
      path.relative(ASSETS_DIR, path.join(dir, hit)).split(path.sep).join("/")
    lines.push(`  ${tsKey(k)}: require("${relRequire}"),`)
  }
  lines.push("} as const\n")
  lines.push("export type AssetKey = keyof typeof MAP")
  lines.push("export namespace Assets {")
  lines.push("  export function get(key: AssetKey) { return MAP[key] }")
  lines.push("}")
  lines.push("export default Assets\n")
  await fs.writeFile(OUT_TS, lines.join("\n"), "utf8")

  console.log(
    "Generated:",
    path.relative(process.cwd(), OUT_JSON),
    "and",
    path.relative(process.cwd(), OUT_TS)
  )
}
main().catch((e) => {
  console.error(e)
  process.exit(1)
})
