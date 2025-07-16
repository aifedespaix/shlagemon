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

async function parseFile(file) {
  const content = await fs.promises.readFile(file, 'utf8')
  const nameMatch = content.match(/\bname:\s*['"]([^'"]+)['"]/)
  const idMatch = content.match(/\bid:\s*['"]([^'"]+)['"]/)
  const name = nameMatch ? nameMatch[1] : (idMatch ? idMatch[1] : null)
  const evoMatch = content.match(/evolution:\s*\{[\s\S]*?condition:\s*\{[\s\S]*?type:\s*['"]lvl['"][\s\S]*?value:\s*(\d+)/)
  if (name && evoMatch)
    return [name, Number(evoMatch[1])]
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
  rows.sort((a, b) => a[1] - b[1])
  const csv = `${rows.map(r => `${r[0]},${r[1]}`).join('\n')}\n`
  await fs.promises.writeFile(path.join(__dirname, '../evolutions.csv'), csv)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
