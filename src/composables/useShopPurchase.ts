/**
 * Composable handling purchase logic in the shop panel.
 */
import type { Item } from '~/type/item'
import { toast } from 'vue3-toastify'

export function useShopPurchase() {
  const game = useGameStore()
  const inventory = useInventoryStore()
  const audio = useAudioStore()
  const { t } = useI18n()

  const selectedItem = ref<Item | null>(null)
  const selectedQty = ref(1)

  const maxQty = computed(() => {
    if (!selectedItem.value)
      return 1
    const money = selectedItem.value.currency === 'shlagidiamond'
      ? game.shlagidiamond
      : game.shlagidolar
    return Math.max(1, Math.floor(money / (selectedItem.value.price ?? 0)))
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
    if (!selectedItem.value)
      return false
    const cost = (selectedItem.value.price ?? 0) * selectedQty.value
    if (selectedItem.value.currency === 'shlagidiamond')
      return game.shlagidiamond >= cost
    return game.shlagidolar >= cost
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
      const currency = selectedItem.value.currency === 'shlagidiamond'
        ? 'Shlagédiamant'
        : 'Shlagédollar'
      const currencyName = cost > 1 ? `${currency}s` : currency
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
