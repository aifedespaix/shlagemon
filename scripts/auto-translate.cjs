const { execFileSync } = require('node:child_process')
const fs = require('node:fs')
const path = require('node:path')
const yaml = require('js-yaml')

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  let files = []
  for (const e of entries) {
    const p = path.join(dir, e.name)
    if (e.isDirectory())
      files = files.concat(walk(p))
    else if (e.isFile() && e.name.endsWith('.i18n.yml'))
      files.push(p)
  }
  return files
}
const files = walk('src/data/shlagemons')
let count = 0
for (const file of files) {
  const content = fs.readFileSync(file, 'utf8')
  const data = yaml.load(content)
  const fr = data?.fr?.description?.trim()
  const en = data?.en?.description?.trim()
  if (fr && (!en || en === fr)) {
    const translation = execFileSync('trans', ['-b', 'fr:en', fr], { encoding: 'utf8' }).trim()
    data.en = { ...data.en, description: translation }
    fs.writeFileSync(file, yaml.dump(data, { lineWidth: 0 }))
    count++
    console.log('translated', file)
  }
}
console.log('total translated', count)
