const fs = require('node:fs')
const path = require('node:path')

function findImage(dir, id) {
  const base = path.join(__dirname, '..', 'public', dir, id)
  for (const ext of ['png', 'webp']) {
    const file = path.join(base, `${id}.${ext}`)
    if (fs.existsSync(file))
      return path.join('/', dir, id, `${id}.${ext}`)
  }
  return null
}

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
    const name = content.match(/name:\s*'((?:\\'|[^'])+)'/)
    if (!id || !name)
      return null
    const label = name[1].replace(/\\'/g, '\'')
    return {
      nom: label,
      type: 'village',
      url: tracks[id[1]] || null,
      image: findImage('villages', id[1]),
    }
  }).filter(Boolean)
}

function parseSavageZones() {
  const dir = path.join(__dirname, '../src/data/zones/savages')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'))
  return files.map((f) => {
    const content = fs.readFileSync(path.join(dir, f), 'utf8')
    const id = content.match(/id:\s*'([^']+)'/)
    const name = content.match(/name:\s*'((?:\\'|[^'])+)'/)
    if (!id || !name)
      return null
    const label = name[1].replace(/\\'/g, '\'')
    return {
      nom: label,
      type: 'sauvage',
      url: tracks[id[1]] || null,
      image: findImage('zones', id[1]),
    }
  }).filter(Boolean)
}

function parseCharacters() {
  const dir = path.join(__dirname, '../src/data/characters')
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'))
  const alias = { 'vladimir-putain': 'poutine' }
  return files.map((f) => {
    const content = fs.readFileSync(path.join(dir, f), 'utf8')
    const id = content.match(/id:\s*'([^']+)'/)
    const name = content.match(/name:\s*'((?:\\'|[^'])+)'/)
    if (!id || !name)
      return null
    const label = name[1].replace(/\\'/g, '\'')
    const key = alias[id[1]] || id[1]
    return {
      nom: label,
      type: 'character',
      url: tracks[key] || null,
      image: findImage('characters', id[1]),
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
      image: findImage('arenas', id),
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
fs.writeFileSync(output, JSON.stringify(data, null, 2).replaceAll('\\\\', '/'), 'utf8')
console.log(`Generated ${output} with ${data.length} entries`)
