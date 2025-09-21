/**
 * Composable handling purchase logic in the shop panel.
 */
import type { Item } from '~/type/item'
import { toast } from '~/modules/toast'

export function useShopPurchase() {
  const game = useGameStore()
  const inventory = useInventoryStore()
  const audio = useAudioStore()
  const { t } = useI18n()

  const selectedItem = ref<Item | null>(null)
  const selectedQty = ref(1)

  function balanceFor(item: Item): number {
    switch (item.currency) {
      case 'shlagidiamond':
        return game.shlagidiamond
      case 'shlagpur':
        return game.shlagpur
      default:
        return game.shlagidolar
    }
  }

  const maxQty = computed(() => {
    const item = selectedItem.value
    if (!item)
      return 1
    const price = item.price ?? 0
    if (price <= 0)
      return 999
    const affordable = Math.floor(balanceFor(item) / price)
    return Math.max(1, affordable)
  })

  watch(selectedItem, () => {
    selectedQty.value = 1
  })

  watch(selectedQty, (v) => {
    if (v < 1)
      selectedQty.value = 1
    else if (v > maxQty.value)
      selectedQty.value = maxQty.value
  })

  /**
   * Set the current item to purchase.
   *
   * @param item Item chosen by the user.
   */
  function selectItem(item: Item) {
    selectedItem.value = item
  }

  const canBuy = computed(() => {
    const item = selectedItem.value
    if (!item)
      return false
    const cost = (item.price ?? 0) * selectedQty.value
    if (cost <= 0)
      return true
    return balanceFor(item) >= cost
  })

  /**
   * Attempt to purchase the currently selected item. Displays a success
   * toast and resets the selection on completion.
   */
  function buy() {
    if (!selectedItem.value)
      return
    const success = inventory.buy(selectedItem.value.id, selectedQty.value)
    if (success) {
      audio.playBuySfx()
      const cost = (selectedItem.value.price ?? 0) * selectedQty.value
      const currencyKey = selectedItem.value.currency ?? 'shlagidolar'
      const currencySingular = t(`components.ui.CurrencyAmount.${currencyKey}`)
      const currencyName = cost > 1 ? `${currencySingular}s` : currencySingular
      toast.success(t('components.panel.Shop.bought', {
        qty: selectedQty.value,
        item: t(selectedItem.value.name),
        cost: cost.toLocaleString(),
        currency: currencyName,
      }))
      selectedItem.value = null
    }
  }

  return {
    selectedItem,
    selectedQty,
    maxQty,
    canBuy,
    selectItem,
    buy,
  }
}
