import type { DexShlagemon } from '~/type/shlagemon'
import { defineStore } from 'pinia'

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

export const useFinalBattleStore = defineStore('finalBattle', () => {
  const active = ref(false)
  const hpSnapshots = ref<Record<string, number>>({})

  const isActive = computed(() => active.value)

  function begin() {
    active.value = true
    hpSnapshots.value = {}
  }

  function finish() {
    active.value = false
    hpSnapshots.value = {}
  }

  function snapshot(mon: DexShlagemon, maxHp: number) {
    if (!active.value)
      return
    const normalized = clamp(Math.round(mon.hpCurrent), 0, Math.round(maxHp))
    hpSnapshots.value = {
      ...hpSnapshots.value,
      [mon.id]: normalized,
    }
  }

  function restore(mon: DexShlagemon, maxHp: number) {
    if (!active.value)
      return
    const roundedMax = Math.max(0, Math.round(maxHp))
    const stored = hpSnapshots.value[mon.id]
    const target = typeof stored === 'number' ? stored : roundedMax
    const normalized = clamp(target, 0, roundedMax)
    mon.hpCurrent = normalized
    hpSnapshots.value = {
      ...hpSnapshots.value,
      [mon.id]: normalized,
    }
  }

  return {
    isActive,
    begin,
    finish,
    snapshot,
    restore,
  }
})
