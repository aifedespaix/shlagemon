import type { EggType } from './egg'
import type { EggItemId } from './eggBox'
import type { Item } from '~/type/item'
import { defineStore } from 'pinia'
import { eggTypeMap } from '~/constants/egg'
import { allShlagemons } from '~/data/shlagemons'
import { mewteub } from '~/data/shlagemons/mewteub'

export const useEggMonsModalStore = defineStore('eggMonsModal', () => {
  const { isVisible, open: openModal, close } = createModalStore()

  const type = ref<EggType | null>(null)
  const item = ref<Item | null>(null)

  const mons = computed(() => {
    if (!type.value)
      return []
    return allShlagemons
      .filter(b => b.types.some(t => t.id === type.value))
      .filter(b => !(type.value === 'psy' && b.id === mewteub.id))
  })

  function open(id: EggItemId, eggItem: Item) {
    type.value = eggTypeMap[id]
    item.value = eggItem
    openModal()
  }

  return { isVisible, mons, item, open, close }
})
