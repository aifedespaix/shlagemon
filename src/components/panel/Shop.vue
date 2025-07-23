<script setup lang="ts">
import type { Item, ItemCategory } from '~/type/item'
import { defineComponent, h } from 'vue'
import { toast } from 'vue3-toastify'
import ShopItemCard from '../shop/ItemCard.vue'
import UiButton from '../ui/Button.vue'

const panel = useMainPanelStore()
const zone = useZoneStore()
const game = useGameStore()
const inventory = useInventoryStore()
const audio = useAudioStore()
const { t } = useI18n()
const shopItems = computed(() => zone.current.village?.shop?.items || [])
const filter = useShopFilterStore()
const categoryOptions = [
  { label: t('components.panel.Shop.category.active'), value: 'actif', icon: 'i-carbon-flash' },
  { label: t('components.panel.Shop.category.passive'), value: 'passif', icon: 'i-carbon-timer' },
  { label: t('components.panel.Shop.category.utility'), value: 'utilitaire', icon: 'i-carbon-tool-box' },
] as const
const availableCategories = computed(() =>
  categoryOptions
    .filter(opt => shopItems.value.some(i => i.category === opt.value))
    .map(opt => ({
      label: { text: opt.label, icon: opt.icon },
      value: opt.value,
    })),
)

const activeTab = ref(0)
const categories = computed(() => availableCategories.value)

watch(() => filter.category, (val) => {
  const idx = categories.value.findIndex(c => c.value === val)
  if (idx !== -1 && idx !== activeTab.value)
    activeTab.value = idx
}, { immediate: true })

watch(activeTab, (val) => {
  const cat = categories.value[val]?.value
  if (cat && cat !== filter.category)
    filter.category = cat
})

watch(availableCategories, (cats) => {
  if (!cats.length)
    filter.category = 'all'
  else if (!cats.some(c => c.value === filter.category))
    filter.category = cats[0].value
}, { immediate: true })

function getList(category: ItemCategory | 'all') {
  return computed(() => {
    let list = shopItems.value.slice()
    if (category !== 'all')
      list = list.filter(item => item.category === category)
    return list.sort((a, b) => {
      const typeComp = (a.type || '').localeCompare(b.type || '')
      if (typeComp !== 0)
        return typeComp
      return (a.power || 0) - (b.power || 0)
    })
  })
}

const tabs = computed(() =>
  categories.value.map(cat => ({
    label: cat.label,
    component: defineComponent({
      name: `ShopTab_${cat.value}`,
      setup() {
        const list = getList(cat.value)
        return () => h('div', {
          class: 'tiny-scrollbar flex flex-col gap-2 overflow-auto py-1',
        }, list.value.map(item => h(ShopItemCard, {
          item,
          class: 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800',
          onClick: () => selectItem(item),
        }, {
          default: () => h(UiButton, {
            class: 'ml-auto text-xs',
            onClick: (e: Event) => {
              e.stopPropagation()
              selectItem(item)
            },
          }, () => t('components.panel.Shop.details')),
        })))
      },
    }),
  })),
)

const filteredShopItems = getList('all')

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
      item: selectedItem.value.name,
      cost: cost.toLocaleString(),
      currency: currencyName,
    }))
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
      {{ t('components.panel.Shop.title') }}
    </h2>
    <UiTabs
      v-if="availableCategories.length > 0"
      v-show="!selectedItem"
      v-model="activeTab"
      :tabs="tabs"
      is-small
      class="flex-1"
      :class="selectedItem ? 'pointer-events-none opacity-50' : ''"
    />
    <div v-else class="tiny-scrollbar flex flex-1 flex-col gap-2 overflow-auto">
      <ShopItemCard
        v-for="item in filteredShopItems"
        :key="item.id"
        :item="item"
        class="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
        @click="selectItem(item)"
      >
        <UiButton class="ml-auto text-xs" @click.stop="selectItem(item)">
          {{ t('components.panel.Shop.details') }}
        </UiButton>
      </ShopItemCard>
    </div>
    <div v-if="selectedItem" class="tiny-scrollbar flex-1 overflow-auto">
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
        {{ t('components.panel.Shop.buy', { qty: selectedQty }) }}
        <UiCurrencyAmount :amount="(selectedItem?.price ?? 0) * selectedQty" :currency="selectedItem?.currency ?? 'shlagidolar'" />
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
          {{ t('components.panel.Shop.back') }}
        </UiButton>

        <UiButton type="danger" variant="outline" class="w-full flex gap-2 text-xs" @click="closeShop">
          <div class="i-carbon:exit" />
          {{ t('components.panel.Shop.exit') }}
        </UiButton>
      </div>
    </div>
  </div>
</template>
