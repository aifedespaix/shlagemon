import { describe, expect, it } from 'vitest'
import { Engine, runScenario } from '../packages/sim/src'

describe('deterministic simulation', () => {
  it('produces stable snapshots', () => {
    const snapshots = runScenario(123, [
      { frame: 2, value: 5 },
      { frame: 5, value: -3 },
    ])
    expect(snapshots).toMatchSnapshot()
  })

  it('restores from snapshot', () => {
    const engine = new Engine(42)
    engine.enqueueInput(3)
    engine.update(engine.stepMs)
    const snap = engine.getSnapshot()

    const restored = new Engine(0)
    restored.setSnapshot(snap)
    expect(restored.getSnapshot()).toEqual(snap)
  })
})
