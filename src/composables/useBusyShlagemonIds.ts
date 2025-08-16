import type { ComputedRef } from 'vue'

/**
 * Provide reactive identifiers of Shlagémon currently busy.
 *
 * Busy Shlagémon are engaged in dojo training, breeding or other tasks and
 * must not be selectable for battles or additional activities.
 */
export function useBusyShlagemonIds(): ComputedRef<string[]> {
  const dex = useShlagedexStore()
  return computed(() =>
    dex.shlagemons.filter(mon => mon.busy).map(mon => mon.id),
  )
}
