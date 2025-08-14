import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import YAML from 'yaml'

function loadLocale(file: string) {
  const __dirname = dirname(fileURLToPath(import.meta.url))
  const filePath = join(__dirname, '..', 'locales', file)
  return YAML.parse(readFileSync(filePath, 'utf8'))
}

function get(obj: any, path: string) {
  return path.split('.').reduce<any>((o, p) => (o ? o[p] : undefined), obj)
}

describe('breeding translations', () => {
  const fr = loadLocale('fr.yml')
  const en = loadLocale('en.yml')

  it('provides required keys in fr', () => {
    const base = get(fr, 'components.panel.Breeding')
    expect(base.intro).toBeTypeOf('string')
    expect(base.outro.running).toBeTypeOf('string')
    expect(base.outro.idle).toBeTypeOf('string')
    expect(base.during.typing).toBeTypeOf('string')
  })

  it('provides required keys in en', () => {
    const base = get(en, 'components.panel.Breeding')
    expect(base.intro).toBeTypeOf('string')
    expect(base.outro.running).toBeTypeOf('string')
    expect(base.outro.idle).toBeTypeOf('string')
    expect(base.during.typing).toBeTypeOf('string')
  })
})
