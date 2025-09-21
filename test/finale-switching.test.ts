import type { FinaleState } from '../src/composables/useFinaleSwitching'
import { createPinia, setActivePinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { nextTick, ref } from 'vue'
import { useFinaleSwitching } from '../src/composables/useFinaleSwitching'
import { carapouffe } from '../src/data/shlagemons/carapouffe'
import { salamiches } from '../src/data/shlagemons/salamiches'
import { useShlagedexStore } from '../src/stores/shlagedex'

function setupTeam() {
  const pinia = createPinia()
  setActivePinia(pinia)
  const finaleState = ref<FinaleState>('idle')
  const controller = useFinaleSwitching(finaleState)
  const dex = useShlagedexStore()
  const monA = dex.createShlagemon(carapouffe)
  const monB = dex.createShlagemon(salamiches)
  dex.addShlagemon(monA)
  dex.addShlagemon(monB)
  dex.setActiveShlagemon(monA)
  return { finaleState, controller, dex, monA, monB }
}

describe('useFinaleSwitching', () => {
  it('prepares the active shlagémon with full HP for the finale', () => {
    const { finaleState, controller, dex, monA } = setupTeam()
    controller.clearMemory()
    monA.hpCurrent = 1
    controller.prepareActiveForFinale()
    expect(monA.hpCurrent).toBe(dex.maxHp(monA))
    expect(controller.canSwitch.value).toBe(false)
    expect(controller.disabledIds.value).toContain(monA.id)
    expect(finaleState.value).toBe('idle')
  })

  it('heals first-time switch-ins and preserves stored HP afterwards', async () => {
    const { finaleState, controller, dex, monA, monB } = setupTeam()
    controller.prepareActiveForFinale()
    finaleState.value = 'battle'
    monA.hpCurrent = 42
    controller.rememberActiveHp()
    const storedHp = controller.hpMemory[monA.id]
    expect(storedHp).toBe(42)
    dex.setActiveShlagemon(monB)
    await nextTick()
    expect(controller.hpMemory[monA.id]).toBe(storedHp)
    expect(monB.hpCurrent).toBe(dex.maxHp(monB))
    monB.hpCurrent = 17
    await nextTick()
    dex.setActiveShlagemon(monA)
    await nextTick()
    expect(monA.hpCurrent).toBe(storedHp)
    dex.setActiveShlagemon(monB)
    await nextTick()
    expect(monB.hpCurrent).toBe(17)
  })

  it('disables fainted allies and blocks switching when none remain', async () => {
    const { finaleState, controller, dex, monA, monB } = setupTeam()
    controller.prepareActiveForFinale()
    finaleState.value = 'battle'
    dex.setActiveShlagemon(monB)
    await nextTick()
    monB.hpCurrent = 0
    await nextTick()
    dex.setActiveShlagemon(monA)
    await nextTick()
    expect(controller.disabledIds.value).toContain(monB.id)
    expect(controller.canSwitch.value).toBe(false)
  })
})
