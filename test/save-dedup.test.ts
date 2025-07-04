import { describe, expect, it } from 'vitest'
import { carapouffe } from '../src/data/shlagemons'
import { createDexShlagemon } from '../src/utils/dexFactory'
import { shlagedexSerializer } from '../src/utils/shlagedex-serialize'

function prepare() {
  const m1 = createDexShlagemon(carapouffe)
  m1.isShiny = false
  m1.rarity = 1
  m1.lvl = 1
  const m2 = createDexShlagemon(carapouffe)
  m2.isShiny = false
  m2.rarity = 5
  m2.lvl = 10
  const m3 = createDexShlagemon(carapouffe)
  m3.isShiny = true
  m3.rarity = 3
  m3.lvl = 2
  const raw = shlagedexSerializer.serialize({
    shlagemons: [m1, m2, m3],
    activeShlagemon: m1,
  })
  return shlagedexSerializer.deserialize(raw)
}

describe('deduplicate on load', () => {
  it('keeps best schlagemon only', () => {
    const data = prepare()
    expect(data.shlagemons).toHaveLength(1)
    const mon = data.shlagemons[0]
    expect(mon.isShiny).toBe(true)
    expect(mon.rarity).toBe(5)
    expect(mon.lvl).toBe(10)
    expect(data.activeShlagemon?.id).toBe(mon.id)
  })
})
