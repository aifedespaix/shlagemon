import type { Ref } from 'vue'
import type { DexShlagemon } from '~/type/shlagemon'
import { computed, reactive, watch } from 'vue'

export type FinaleState = 'idle' | 'intro' | 'battle' | 'victory' | 'defeat'

interface FinaleHpMemory extends Record<string, number> {}

function clearRecord(record: FinaleHpMemory) {
  for (const key of Object.keys(record))
    delete record[key]
}

/**
 * Manage player team switching behaviour during the laboratory finale battle.
 *
 * The composable remembers HP values of every Shlagémon that participates in
 * the finale so switching away and back preserves their remaining health.
 * Newcomers enter the fight at full health and the memory is cleared once the
 * finale ends so that future attempts always start fresh.
 *
 * @param finaleState - Reactive finale state indicator.
 */
export function useFinaleSwitching(finaleState: Ref<FinaleState>) {
  const dex = useShlagedexStore()
  const hpMemory = reactive<FinaleHpMemory>({})

  function remember(mon: DexShlagemon) {
    hpMemory[mon.id] = Math.max(0, mon.hpCurrent)
  }

  function applyEntry(mon: DexShlagemon) {
    const stored = hpMemory[mon.id]
    if (stored === undefined) {
      const fullHp = dex.maxHp(mon)
      mon.hpCurrent = fullHp
      hpMemory[mon.id] = fullHp
      return
    }
    mon.hpCurrent = stored
    hpMemory[mon.id] = stored
  }

  function prepareActiveForFinale() {
    const active = dex.activeShlagemon
    if (!active)
      return
    applyEntry(active)
  }

  function clearMemory() {
    clearRecord(hpMemory)
  }

  function rememberActiveHp() {
    const active = dex.activeShlagemon
    if (!active)
      return
    remember(active)
  }

  const switchCandidates = computed(() => {
    if (finaleState.value !== 'battle')
      return [] as DexShlagemon[]
    const currentId = dex.activeShlagemon?.id
    return dex.shlagemons.filter((mon) => {
      if (mon.id === currentId || mon.busy)
        return false
      const stored = hpMemory[mon.id]
      const hp = stored ?? dex.maxHp(mon)
      return hp > 0
    })
  })

  const disabledIds = computed(() => {
    if (finaleState.value !== 'battle')
      return dex.shlagemons.map(mon => mon.id)
    const currentId = dex.activeShlagemon?.id
    const disabled: string[] = []
    for (const mon of dex.shlagemons) {
      if (mon.id === currentId || mon.busy) {
        disabled.push(mon.id)
        continue
      }
      const stored = hpMemory[mon.id]
      const hp = stored ?? dex.maxHp(mon)
      if (hp <= 0)
        disabled.push(mon.id)
    }
    return disabled
  })

  const canSwitch = computed(() => finaleState.value === 'battle' && switchCandidates.value.length > 0)

  watch(
    () => dex.activeShlagemon?.id,
    (currentId, previousId) => {
      if (finaleState.value !== 'battle')
        return
      if (previousId && previousId !== currentId) {
        const previous = dex.shlagemons.find(mon => mon.id === previousId)
        if (previous)
          remember(previous)
      }
      if (!currentId)
        return
      const current = dex.shlagemons.find(mon => mon.id === currentId)
      if (!current)
        return
      applyEntry(current)
    },
  )

  watch(
    () => dex.activeShlagemon?.hpCurrent,
    (hp) => {
      if (finaleState.value !== 'battle')
        return
      if (typeof hp !== 'number')
        return
      const active = dex.activeShlagemon
      if (!active)
        return
      remember(active)
    },
  )

  return {
    hpMemory,
    canSwitch,
    switchCandidates,
    disabledIds,
    prepareActiveForFinale,
    clearMemory,
    rememberActiveHp,
  }
}
