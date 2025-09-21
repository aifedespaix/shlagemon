import type { ItemId } from '~/data/items'
import type { Item, ItemCategory } from '~/type/item'
import { defineStore } from 'pinia'
import {
  allItems,
  badgeBox as badgeBoxItem,
  eggBox as eggBoxItem,
  odorElixir,
  chromaticPotion,
  shlagPotion,
} from '~/data/items'
import { hyperShlageball, masterShlageball, shlageball, superShlageball } from '~/data/items/shlageball'
import { allShlagemons } from '~/data/shlagemons'
import { i18n } from '~/modules/i18n'
import { toast } from '~/modules/toast'
import { useAudioStore } from './audio'
import { useOdorElixirStore } from './odorElixir'
import { useChromaticPotionStore } from './chromaticPotion'

export const useInventoryStore = defineStore('inventory', () => {
  const items = ref<Partial<Record<ItemId, number>>>({})
  const game = useGameStore()
  const dex = useShlagedexStore()
  const featureLock = useFeatureLockStore()
  const player = usePlayerStore()
  const captureLimitModal = useCaptureLimitModalStore()
  const itemUsage = useItemUsageStore()
  const eggBox = useEggBoxStore()
  const badgeBox = useBadgeBoxStore()
  const odorElixirStore = useOdorElixirStore()
  const chromaticPotionStore = useChromaticPotionStore()
  const audio = useAudioStore()
  const battleCooldown = useBattleItemCooldownStore()

  const categoryTranslationKeys: Record<ItemCategory, string> = {
    actif: 'components.panel.Inventory.category.active',
    passif: 'components.panel.Inventory.category.passive',
    utilitaire: 'components.panel.Inventory.category.utility',
    activable: 'components.panel.Inventory.category.activable',
    battle: 'components.panel.Inventory.category.battle',
  }

  interface ListedItem {
    item: Item
    qty: number
  }

  const list = computed(() =>
    Object.entries(items.value).reduce<ListedItem[]>((acc, [id, qty]) => {
      const item = allItems.find(i => i.id === id as ItemId)
      if (item)
        acc.push({ item, qty: qty ?? 0 })
      return acc
    }, []),
  )

  interface AddOptions {
    toast?: boolean
  }

  function add(id: ItemId, qty = 1, options: AddOptions = {}) {
    if (eggBox.unlocked && id.startsWith('oeuf-')) {
      eggBox.addEgg(id as EggItemId, qty)
      return
    }
    items.value[id] = (items.value[id] || 0) + qty
    if (options.toast) {
      const item = allItems.find(i => i.id === id)
      if (item?.category) {
        const categoryKey = categoryTranslationKeys[item.category as ItemCategory]
        toast.success(i18n.global.t('stores.inventory.toast.item', {
          qty,
          item: i18n.global.t(item.name),
          category: i18n.global.t(categoryKey),
        }))
      }
    }
  }

  function remove(id: ItemId, qty = 1) {
    if (eggBox.unlocked && id.startsWith('oeuf-')) {
      eggBox.removeEgg(id as EggItemId, qty)
      return
    }
    if (!items.value[id])
      return
    items.value[id] -= qty
    if (items.value[id] <= 0)
      delete items.value[id]
  }

  function buy(id: ItemId, qty = 1) {
    const item = allItems.find(i => i.id === id)
    if (!item)
      return false
    if (item.unique && (items.value[id] || dex.shlagemons.some(m => m.heldItemId === id)))
      return false
    const cost = (item.price ?? 0) * qty
    if (item.currency === 'shlagidiamond') {
      if (game.shlagidiamond < cost)
        return false
      game.addShlagidiamond(-cost)
    }
    else if (item.currency === 'shlagpur') {
      if (game.shlagpur < cost)
        return false
      game.addShlagpur(-cost)
    }
    else {
      if (game.shlagidolar < cost)
        return false
      game.addShlagidolar(-cost)
    }
    add(id, qty)
    return true
  }

  function sell(id: ItemId) {
    const item = allItems.find(i => i.id === id)
    if (!item || !items.value[id])
      return
    remove(id)
    game.addShlagidolar(Math.floor((item.price ?? 0) / 2))
  }

  function useItem(id: ItemId) {
    if (featureLock.isInventoryLocked || !items.value[id])
      return false

    notifyAchievement({ type: 'item-used' })

    const item = allItems.find(i => i.id === id)
    if (!item)
      return false
    const panel = useMainPanelStore()
    if (panel.current === 'trainerBattle') {
      if (item.category !== 'battle' || battleCooldown.isActive)
        return false
    }
    const { icon, iconClass } = item

    const capture = () => {
      const level = 1
      if (level > player.captureLevelCap) {
        captureLimitModal.open(level)
        return false
      }
      const base = allShlagemons[Math.floor(Math.random() * allShlagemons.length)]
      const mon = dex.captureShlagemon(base)
      notifyAchievement({ type: 'capture', shiny: mon.isShiny })
      remove(id)
      return true
    }

    const handlers: Record<ItemId, () => boolean> = {
      [badgeBoxItem.id]: () => {
        badgeBox.open()
        return true
      },
      [eggBoxItem.id]: () => {
        eggBox.open()
        return true
      },
      [shlageball.id]: capture,
      [superShlageball.id]: capture,
      [hyperShlageball.id]: capture,
      [masterShlageball.id]: capture,
      [chromaticPotion.id]: () => {
        chromaticPotionStore.open(item)
        return true
      },
      [odorElixir.id]: () => {
        odorElixirStore.open(item)
        return true
      },
      [shlagPotion.id]: () => {
        dex.healActivePercent(shlagPotion.power)
        remove(id)
        return true
      },
    }

    const typeHandlers: Record<string, (power: number) => boolean> = {
      heal: (p: number) => {
        dex.healActive(p)
        remove(id)
        return true
      },
      defense: (p: number) => {
        dex.boostDefense(p, icon, iconClass)
        remove(id)
        return true
      },
      attack: (p: number) => {
        dex.boostAttack(p, icon, iconClass)
        remove(id)
        return true
      },
      vitality: (p: number) => {
        dex.boostVitality(p, icon, iconClass)
        remove(id)
        return true
      },
      capture: (p: number) => {
        dex.boostCapture(p, icon, iconClass)
        remove(id)
        return true
      },
      xp: (p: number) => {
        dex.boostXp(p, icon, iconClass)
        remove(id)
        return true
      },
    }

    const handler = handlers[id]
      || (item.type && typeHandlers[item.type]
        ? () => typeHandlers[item.type!](item.power || 0)
        : undefined)
    const result = handler ? handler() : false
    if (result) {
      itemUsage.markUsed(id)
      if (item.sfxId)
        audio.playSfx(item.sfxId)
      if (['defense', 'attack', 'vitality', 'xp', 'capture'].includes(item.type ?? ''))
        usePotionInfoStore().trigger()
      if (item.category === 'battle')
        battleCooldown.start(item.battleCooldown)
    }
    return result
  }

  function reset() {
    items.value = {}
  }

  return { items, list, add, remove, buy, sell, useItem, reset }
}, {
  persist: true,
})
