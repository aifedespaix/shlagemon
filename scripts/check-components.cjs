const fs = require('node:fs')
const path = require('node:path')

const componentsDefs = fs.readFileSync('src/components.d.ts', 'utf8')
const componentRegex = /\s(\w+):/g
const components = new Set()
for (const match of componentsDefs.matchAll(componentRegex)) {
  components.add(match[1])
}
const builtIns = new Set(['Transition', 'TransitionGroup', 'KeepAlive', 'Teleport', 'Suspense'])

function extractComponentsFromTemplate(content) {
  const templateMatch = content.match(/<template>([\s\S]*?)<\/template>/)
  if (!templateMatch)
    return []
  const template = templateMatch[1]
  const tagRegex = /<([A-Z][\w-]*)/g
  const tags = new Set()
  for (const m of template.matchAll(tagRegex)) {
    tags.add(m[1])
  }
  return Array.from(tags)
}

function walk(dir) {
  const files = fs.readdirSync(dir)
  for (const file of files) {
    const full = path.join(dir, file)
    const stat = fs.statSync(full)
    if (stat.isDirectory()) {
      walk(full)
    }
    else if (file.endsWith('.vue')) {
      const content = fs.readFileSync(full, 'utf8')
      const used = extractComponentsFromTemplate(content)
      const missing = used.filter(u => !components.has(u) && !builtIns.has(u))
      if (missing.length) {
        console.log(full, '-> missing', missing.join(', '))
      }
    }
  }
}

walk('src')
