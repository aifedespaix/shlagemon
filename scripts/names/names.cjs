const fs = require('node:fs')
const path = require('node:path')

/**
 * Recursively extracts id and name pairs from all TypeScript files within a directory.
 * @param {string} dir - Absolute path to traverse.
 * @returns {{ id: string, name: string }[]} List of extracted entities.
 */
function extractEntries(dir) {
  const entries = []
  if (!fs.existsSync(dir))
    return entries

  /** @param {string} current */
  function walk(current) {
    for (const item of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, item.name)
      if (item.isDirectory()) {
        walk(fullPath)
        continue
      }
      if (!item.isFile() || !item.name.endsWith('.ts'))
        continue
      const content = fs.readFileSync(fullPath, 'utf8')
      const id = content.match(/id:\s*'([^']+)'/)
      const name = content.match(/name:\s*'((?:\\'|[^'])+)'/)
      if (id && name)
        entries.push({ id: id[1], name: name[1].replace(/\\'/g, '\'') })
    }
  }

  walk(dir)
  return entries
}

const shlagemons = extractEntries(path.join(__dirname, '../../src/data/shlagemons'))
const characters = extractEntries(path.join(__dirname, '../../src/data/characters'))
const zones = [
  ...extractEntries(path.join(__dirname, '../../src/data/zones/savages')).map(z => ({ ...z, type: 'sauvage' })),
  ...extractEntries(path.join(__dirname, '../../src/data/zones/villages')).map(z => ({ ...z, type: 'village' })),
]

const data = { shlagemons, zones, characters }

const output = path.join(__dirname, 'names.json')
fs.writeFileSync(output, JSON.stringify(data, null, 2), 'utf8')
console.log(`Generated ${output} with ${shlagemons.length} shlagemons, ${zones.length} zones and ${characters.length} characters`)
