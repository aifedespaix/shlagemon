const fs = require('node:fs')
const path = require('node:path')

function readTracks(dir) {
  const map = {}
  if (!fs.existsSync(dir))
    return map
  const files = fs.readdirSync(dir)
  for (const file of files) {
    if (file.endsWith('.ogg'))
      map[path.basename(file, '.ogg')] = path.join('/audio/musics', path.basename(dir), file)
  }
  return map
}

const trackDirs = [
  'public/audio/musics/villages',
  'public/audio/musics/battle',
  'public/audio/musics/character',
  'public/audio/musics/arenas',
]

const tracks = trackDirs.reduce((acc, dir) => Object.assign(acc, readTracks(path.join(__dirname, '..', dir))), {})

function parseVillages() {
  const dir = path.join(__dirname, '../src/data/zones/villages')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'))
  return files.map((f) => {
    const content = fs.readFileSync(path.join(dir, f), 'utf8')
    const id = content.match(/id:\s*'([^']+)'/)
    const name = content.match(/name:\s*'([^']+)'/)
    if (!id || !name)
      return null
    return {
      nom: name[1],
      type: 'village',
      url: tracks[id[1]] || null,
    }
  }).filter(Boolean)
}

function parseSavageZones() {
  const file = path.join(__dirname, '../src/data/zones.ts')
  const content = fs.readFileSync(file, 'utf8')
  const regex = /\{\s*id:\s*'([^']+)'[^}]*?name:\s*'([^']+)'/g
  const zones = []
  let match = regex.exec(content)
  while (match) {
    zones.push({
      nom: match[2],
      type: 'sauvage',
      url: tracks[match[1]] || null,
    })
    match = regex.exec(content)
  }
  return zones
}

function parseCharacters() {
  const dir = path.join(__dirname, '../src/data/characters')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'))
  const alias = { 'vladimir-putain': 'poutine' }
  return files.map((f) => {
    const content = fs.readFileSync(path.join(dir, f), 'utf8')
    const id = content.match(/id:\s*'([^']+)'/)
    const name = content.match(/name:\s*'([^']+)'/)
    if (!id || !name)
      return null
    const key = alias[id[1]] || id[1]
    return {
      nom: name[1],
      type: 'character',
      url: tracks[key] || null,
    }
  }).filter(Boolean)
}

function parseArenas() {
  const file = path.join(__dirname, '../src/data/arenas.ts')
  const content = fs.readFileSync(file, 'utf8')
  const regex = /export const (arena\d+):/g
  const arenas = []
  let match = regex.exec(content)
  while (match) {
    const id = match[1]
    arenas.push({
      nom: id,
      type: 'arena',
      url: tracks[id] || null,
    })
    match = regex.exec(content)
  }
  return arenas
}

const data = [
  ...parseVillages(),
  ...parseSavageZones(),
  ...parseCharacters(),
  ...parseArenas(),
]

const output = path.join(__dirname, '../public/music-data.json')
fs.writeFileSync(output, JSON.stringify(data, null, 2))
console.log(`Generated ${output} with ${data.length} entries`)
