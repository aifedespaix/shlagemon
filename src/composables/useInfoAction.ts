import type { Ref } from 'vue'
import type { DexShlagemon } from '~/type/shlagemon'
import { useDexDetailModalStore } from '~/stores/dexDetailModal'
import { useDexInfoModalStore } from '~/stores/dexInfoModal'

/**
 * Returns a callback opening the appropriate info modal for the shlagemon.
 */
export function useInfoAction(mon: Ref<DexShlagemon>, belongsToPlayer: Ref<boolean>) {
  const detail = useDexDetailModalStore()
  const info = useDexInfoModalStore()
  return () => {
    if (belongsToPlayer.value)
      detail.open(mon.value)
    else
      info.open(mon.value)
  }
}
