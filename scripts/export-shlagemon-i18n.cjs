const fs = require('node:fs')
const path = require('node:path')
const YAML = require('yaml')

const baseDir = path.join(__dirname, '../src/data/shlagemons')

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  let files = []
  for (const entry of entries) {
    const res = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'evolutions')
        continue
      files = files.concat(walk(res))
    }
    else if (entry.isFile() && entry.name.endsWith('.ts') && entry.name !== 'index.ts') {
      files.push(res)
    }
  }
  return files
}

const files = walk(baseDir)

for (const file of files) {
  const dir = path.dirname(file)
  const name = path.basename(file, '.ts')
  const ymlPath = path.join(dir, `${name}.i18n.yml`)
  if (fs.existsSync(ymlPath))
    continue

  const content = fs.readFileSync(file, 'utf8')
  const idMatch = content.match(/id:\s*'([^']+)'/)
  const descMatch = content.match(/description:\s*`([\s\S]*?)`/)
  if (!idMatch || !descMatch)
    continue
  const id = idMatch[1]
  const description = descMatch[1].trim()
  const data = {
    [id]: {
      fr: {
        description,
      },
    },
  }
  const yml = YAML.stringify(data, { lineWidth: 0 })
  fs.writeFileSync(ymlPath, yml)
  console.log(`Created ${ymlPath}`)
}
