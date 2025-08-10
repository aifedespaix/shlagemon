import type { Ref } from 'vue'
import type { DexShlagemon } from '~/type/shlagemon'
import { useTypeChartModalStore } from '~/stores/typeChartModal'

/**
 * Returns a callback opening the type chart for the mon's primary type.
 */
export function useTypeChartAction(mon: Ref<DexShlagemon>) {
  const store = useTypeChartModalStore()
  return () => {
    const type = mon.value.base.types[0]
    if (type)
      store.open(type.id)
  }
}
