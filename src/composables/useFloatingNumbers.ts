import type { Ref } from 'vue'

/** Kind of floating number. */
export type FloatingKind = 'damage' | 'heal'

/** Entry representing a floating number animation. */
export interface FloatingEntry {
  readonly id: number
  readonly amount: number
  readonly kind: FloatingKind
  readonly dx: number
  readonly dy: number
  readonly rotation: number
  readonly scale: number
}

interface PendingDelta {
  readonly delta: number
}

/**
 * Handles batching and placement logic for floating damage/heal numbers.
 * No direct DOM access to remain SSR friendly.
 */
export function useFloatingNumbers(hp: Ref<number>, visible: Ref<boolean>) {
  const entries = ref<FloatingEntry[]>([])
  let lastHp = hp.value
  const pending: PendingDelta[] = []
  let flushScheduled = false
  let idCounter = 0
  let totalDamage = 0
  let damageCount = 0

  function clear(): void {
    pending.splice(0, pending.length)
    entries.value = []
    totalDamage = 0
    damageCount = 0
  }

  watch(visible, (v) => {
    if (!v)
      clear()
  })

  function remove(id: number): void {
    const i = entries.value.findIndex(e => e.id === id)
    if (i !== -1)
      entries.value.splice(i, 1)
  }

  function scheduleFlush(): void {
    if (flushScheduled || !visible.value)
      return
    flushScheduled = true
    const raf = typeof requestAnimationFrame === 'function'
      ? requestAnimationFrame
      : (cb: FrameRequestCallback) => setTimeout(cb, 16)
    raf(() => {
      flushScheduled = false
      if (pending.length === 0)
        return
      const batch = pending.splice(0)
      const built = buildEntries(batch)
      for (const e of built)
        entries.value.push(e)
    })
  }

  function pushDelta(delta: number): void {
    if (delta === 0)
      return
    pending.push({ delta })
    scheduleFlush()
  }

  watch(hp, (next) => {
    if (!visible.value) {
      lastHp = next
      return
    }
    const delta = next - lastHp
    lastHp = next
    if (delta !== 0)
      pushDelta(delta)
  })

  function buildEntries(batch: PendingDelta[]): FloatingEntry[] {
    const results: FloatingEntry[] = []
    const usedDx: number[] = []
    function randomDx(width: number, maxHoriz: number): number {
      const minGap = width
      for (let attempt = 0; attempt < 8; attempt++) {
        const candidate = Math.round((Math.random() * 2 - 1) * maxHoriz)
        if (usedDx.every(prev => Math.abs(prev - candidate) > minGap)) {
          usedDx.push(candidate)
          return candidate
        }
      }
      const fallback = Math.round((Math.random() * 2 - 1) * maxHoriz)
      usedDx.push(fallback)
      return fallback
    }
    for (const { delta } of batch) {
      if (delta === 0)
        continue
      const kind: FloatingKind = delta < 0 ? 'damage' : 'heal'
      const amount = Math.abs(delta)
      let dx = 0
      let dy = 0
      let rotation = 0
      let scale = 1
      if (kind === 'damage') {
        const charCount = String(amount).length + 1
        const w = Math.max(14, charCount * 8)
        const maxHoriz = w * 1.5
        dx = randomDx(w, maxHoriz)
        const centerFactor = 1 - Math.abs(dx) / maxHoriz
        const baseRise = 46
        const extraRise = 18 * centerFactor
        dy = -((baseRise + extraRise + Math.random() * 10) * 0.5)
        const magnitude = 4 + Math.random() * 6
        rotation = Math.round(magnitude * Math.sign(dx))
        const average = damageCount > 0 ? totalDamage / damageCount : amount
        const ratio = amount / average
        scale = ratio < 1 ? 1 : Math.min(ratio, 3)
        totalDamage += amount
        damageCount++
      }
      else {
        dy = (46 + Math.random() * 10) * 0.5
      }
      results.push({
        id: ++idCounter,
        amount,
        kind,
        dx,
        dy: Math.round(dy),
        rotation,
        scale,
      })
    }
    return results
  }

  onUnmounted(() => {
    entries.value = []
  })

  return {
    entries: readonly(entries),
    pushDelta,
    remove,
    clear,
  } as const
}
