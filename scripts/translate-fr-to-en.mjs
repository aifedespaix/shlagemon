import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'

const baseDirs = [
  path.join('src', 'components'),
  path.join('src', 'stores'),
  path.join('src', 'data'),
]

async function translate(text) {
  const params = new URLSearchParams({ q: text, langpair: 'fr|en' })
  const res = await fetch('https://api.mymemory.translated.net/get', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params,
  })
  const json = await res.json()
  return json.responseData.translatedText
}

async function processFile(file) {
  const content = fs.readFileSync(file, 'utf8')
  const data = yaml.load(content)
  const root = Object.keys(data)[0]
  const fr = data[root].fr
  if (!fr || data[root].en)
    return
  const en = {}
  for (const key of Object.keys(fr)) {
    if (typeof fr[key] === 'string')
      en[key] = await translate(fr[key])
  }
  data[root].en = en
  fs.writeFileSync(file, yaml.dump(data, { lineWidth: 0 }))
  console.log('Updated', file)
}

async function main() {
  for (const base of baseDirs) {
    if (!fs.existsSync(base))
      continue
    const files = []
    function walk(dir) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const res = path.join(dir, entry.name)
        if (entry.isDirectory())
          walk(res)
        else if (entry.isFile() && res.endsWith('.i18n.yml'))
          files.push(res)
      }
    }
    walk(base)
    for (const f of files)
      await processFile(f)
  }
}

main()
