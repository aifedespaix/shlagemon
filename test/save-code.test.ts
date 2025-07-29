import { describe, expect, it } from 'vitest'
import { exportSave, importSave } from '../src/utils/save-code'

describe('save code', () => {
  it('round trips correctly', () => {
    const data = {
      game: { shlagidolar: 10 },
      inventory: { items: { potion: 2 } },
    }
    const code = exportSave(data)
    const restored = importSave(code)
    expect(restored).toEqual(data)
  })
})
