const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

async function getFiles(dir) {
  const dirents = await fs.promises.readdir(dir, { withFileTypes: true })
  const files = []
  for (const dirent of dirents) {
    const res = path.join(dir, dirent.name)
    if (dirent.isDirectory()) {
      files.push(...await getFiles(res))
    }
    else if (dirent.name.endsWith('.ts')) {
      files.push(res)
    }
  }
  return files
}

function extractSpawnInfo(file) {
  const match = file.match(/shlagemons[\\/](\d{2})-(\d{2})[\\/]/)
  if (match) {
    const start = Number(match[1])
    const end = Number(match[2])
    return { range: `${start}-${end}`, sort: start }
  }
  // Default to level 1 for starters or special cases
  return { range: '1', sort: 1 }
}

async function parseFile(file) {
  const content = await fs.promises.readFile(file, 'utf8')
  const nameMatch = content.match(/\bname:\s*['"]([^'"]+)['"]/)
  const idMatch = content.match(/\bid:\s*['"]([^'"]+)['"]/)
  const coeffMatch = content.match(/coefficient:\s*(\d+)/)
  const name = nameMatch ? nameMatch[1] : (idMatch ? idMatch[1] : null)
  const evoMatch = content.match(/type:\s*['"]lvl['"][\s\S]*?value:\s*(\d+)/)
  if (name) {
    const spawn = extractSpawnInfo(file)
    const evoLevel = evoMatch ? Number(evoMatch[1]) : ''
    const coefficient = coeffMatch ? Number(coeffMatch[1]) : ''
    return { name, spawn, evoLevel, coefficient }
  }
  return null
}

async function main() {
  const baseDir = path.join(__dirname, '../src/data/shlagemons')
  const files = await getFiles(baseDir)
  const rows = []
  for (const file of files) {
    const row = await parseFile(file)
    if (row)
      rows.push(row)
  }
  rows.sort((a, b) => a.coefficient - b.coefficient)
  const header = 'Index,Name,Level,Coefficient,EvolutionLevel'
  const csv = `${header}\n${rows.map((r, i) => `${i + 1},${r.name},${r.spawn.range},${r.coefficient},${r.evoLevel}`).join('\n')}\n`
  await fs.promises.writeFile(path.join(__dirname, '../evolutions.csv'), csv)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
