<script setup lang="ts">
import type { Item } from '~/type/item'
import { toast } from 'vue3-toastify'
import {
  itemCategoryTabBaseColors,
  itemCategoryTabColors,
  itemCategoryTabHoverColors,
} from '~/constants/itemCategory'
import { useAudioStore } from '~/stores/audio'
import { useGameStore } from '~/stores/game'
import { useInventoryStore } from '~/stores/inventory'
import { useMainPanelStore } from '~/stores/mainPanel'
import { useShopFilterStore } from '~/stores/shopFilter'
import { useZoneStore } from '~/stores/zone'

const panel = useMainPanelStore()
const zone = useZoneStore()
const game = useGameStore()
const inventory = useInventoryStore()
const audio = useAudioStore()
const shopItems = computed(() => zone.current.village?.shop?.items || [])
const filter = useShopFilterStore()
const categoryOptions = [
  { label: 'Actif', value: 'actif', icon: 'i-carbon-flash' },
  { label: 'Passif', value: 'passif', icon: 'i-carbon-timer' },
  { label: 'Utilitaire', value: 'utilitaire', icon: 'i-carbon-tool-box' },
] as const
const availableCategories = computed(() =>
  categoryOptions.filter(opt => shopItems.value.some(i => i.category === opt.value)),
)

watch(availableCategories, (cats) => {
  if (!cats.length)
    filter.category = 'all'
  else if (!cats.some(c => c.value === filter.category))
    filter.category = cats[0].value
}, { immediate: true })

const tabColors = itemCategoryTabBaseColors
const tabHoverColors = itemCategoryTabHoverColors
const tabActiveColors = itemCategoryTabColors
const filteredShopItems = computed(() =>
  shopItems.value.filter(item =>
    filter.category === 'all' ? true : item.category === filter.category,
  ),
)
const selectedItem = ref<Item | null>(null)
const selectedQty = ref(1)

const maxQty = computed(() => {
  if (!selectedItem.value)
    return 1
  const money = selectedItem.value.currency === 'shlagidiamond'
    ? game.shlagidiamond
    : game.shlagidolar
  return Math.max(1, Math.floor(money / selectedItem.value.price))
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

function selectItem(item: Item) {
  selectedItem.value = item
}

const canBuy = computed(() => {
  if (!selectedItem.value)
    return false
  const cost = selectedItem.value.price * selectedQty.value
  if (selectedItem.value.currency === 'shlagidiamond')
    return game.shlagidiamond >= cost
  return game.shlagidolar >= cost
})

function buy() {
  if (!selectedItem.value)
    return
  const success = inventory.buy(selectedItem.value.id, selectedQty.value)
  if (success) {
    audio.playBuySfx()
    const cost = selectedItem.value.price * selectedQty.value
    const currency = selectedItem.value.currency === 'shlagidiamond'
      ? 'Shlagédiamant'
      : 'Shlagédollar'
    const currencyName = cost > 1 ? `${currency}s` : currency
    toast.success(`Vous avez acheté ${selectedQty.value} \u00D7 ${selectedItem.value.name} pour ${cost.toLocaleString()} ${currencyName}`)
    selectedItem.value = null
  }
}

function closeShop() {
  panel.showVillage()
}
</script>

<template>
  <div class="flex flex-1 flex-col gap-1 overflow-hidden p-1" v-bind="$attrs">
    <h2 class="text-center font-bold">
      Boutique
    </h2>
    <UiTabBar
      v-if="availableCategories.length > 0"
      v-model="filter.category"
      :options="availableCategories"
      :colors="tabColors"
      :hover-colors="tabHoverColors"
      :active-colors="tabActiveColors"
      :disabled="!!selectedItem"
      class="-mb-1"
    />
    <div v-if="!selectedItem" class="tiny-scrollbar flex flex-1 flex-col gap-2 overflow-auto">
      <ShopItemCard
        v-for="item in filteredShopItems"
        :key="item.id"
        :item="item"
        class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
        @click="selectItem(item)"
      >
        <UiButton class="ml-auto text-xs" @click.stop="selectItem(item)">
          Détails
        </UiButton>
      </ShopItemCard>
    </div>
    <div v-else class="tiny-scrollbar flex-1 overflow-auto">
      <ShopItemDetail v-model:qty="selectedQty" :item="selectedItem" />
    </div>
    <div class="flex flex-wrap gap-2 bg-white dark:bg-gray-900" md="flex-nowrap justify-end">
      <UiButton
        v-if="selectedItem"
        :disabled="!canBuy"
        type="primary"
        class="flex flex-1 items-center gap-1"
        @click="buy"
      >
        Acheter x{{ selectedQty }} pour
        <UiCurrencyAmount :amount="(selectedItem?.price || 0) * selectedQty" :currency="selectedItem?.currency ?? 'shlagidolar'" />
      </UiButton>
      <div class="w-full flex gap-1" md="flex-col w-auto">
        <UiButton
          v-if="selectedItem"
          class="w-full flex gap-2 text-xs"
          variant="outline"
          type="danger"
          @click="selectedItem = null"
        >
          <div class="i-carbon:return" />
          Retour dans le rayon
        </UiButton>

        <UiButton type="danger" variant="outline" class="w-full flex gap-2 text-xs" @click="closeShop">
          <div class="i-carbon:exit" />
          Quitter la boutique
        </UiButton>
      </div>
    </div>
  </div>
</template>
