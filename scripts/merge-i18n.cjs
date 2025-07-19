const fs = require('node:fs')
const path = require('node:path')
const yaml = require('js-yaml')

const baseDirs = [
  path.join(__dirname, '../src/components'),
  path.join(__dirname, '../src/stores'),
  path.join(__dirname, '../src/data'),
  path.join(__dirname, '../src/pages'),
]

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const res = path.join(dir, entry.name)
    if (entry.isDirectory())
      walk(res, files)
    else if (entry.isFile() && entry.name.endsWith('.i18n.yml'))
      files.push(res)
  }
  return files
}

function merge(target, source) {
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (target[key] && typeof target[key] === 'object' && typeof source[key] === 'object')
        merge(target[key], source[key])
      else
        target[key] = source[key]
    }
  }
  return target
}

const translations = {}
const supportedLangs = ['en', 'fr']

for (const dir of baseDirs) {
  if (!fs.existsSync(dir))
    continue
  const files = walk(dir)
  for (const file of files) {
    const content = yaml.load(fs.readFileSync(file, 'utf8'))
    const rootKey = Object.keys(content)[0]
    const langs = content[rootKey]
    for (const lang of Object.keys(langs)) {
      if (!supportedLangs.includes(lang))
        continue
      translations[lang] = translations[lang] || {}
      translations[lang][rootKey] = merge(translations[lang][rootKey] || {}, langs[lang])
    }
  }
}

const inputDir = path.join(__dirname, '../locales')
const outputDir = inputDir

for (const file of fs.readdirSync(inputDir)) {
  if (!file.endsWith('.yml'))
    continue
  const lang = path.basename(file, '.yml')
  if (!supportedLangs.includes(lang)) {
    fs.rmSync(path.join(inputDir, file))
    continue
  }
  const base = yaml.load(fs.readFileSync(path.join(inputDir, file), 'utf8')) || {}
  const merged = merge(base, translations[lang] || {})
  fs.writeFileSync(path.join(outputDir, file), yaml.dump(merged, { lineWidth: 0 }))
}
