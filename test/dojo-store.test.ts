import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { pikachiant } from '../src/data/shlagemons/15-20/pikachiant'
import { dojoTrainingCost, useDojoStore } from '../src/stores/dojo'
import { useGameStore } from '../src/stores/game'
import { useShlagedexStore } from '../src/stores/shlagedex'

describe('dojo store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('computes cost correctly', () => {
    expect(dojoTrainingCost(1, 1)).toBe(1000)
    expect(dojoTrainingCost(99, 1)).toBe(100000000)
  })

  it('starts and completes a training job', () => {
    const game = useGameStore()
    game.addShlagidolar(200000000)
    const dex = useShlagedexStore()
    const mon = dex.createShlagemon(pikachiant)
    const dojo = useDojoStore()
    const result = dojo.startTraining(mon.id, mon.rarity, 1)
    expect(result.ok).toBe(true)
    const job = dojo.getJob(mon.id)
    expect(job).not.toBeNull()
    if (job)
      job.endsAt = Date.now() - 1
    const before = mon.rarity
    const completed = dojo.completeIfDue(mon.id)
    expect(completed).toBe(true)
    expect(mon.rarity).toBe(before + 1)
  })
})
