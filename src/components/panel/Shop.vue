<script setup lang="ts">

const panel = useMainPanelStore()
const { t } = useI18n()

const {
  selectedItem,
  selectedQty,
  canBuy,
  selectItem,
  buy,
} = useShopPurchase()

const {
  activeTab,
  availableCategories,
  tabs,
  filteredShopItems,
} = useShopTabs(selectItem)

function closeShop() {
  panel.showVillage()
}
</script>

<template>
  <LayoutTitledPanel
    :title="t('components.panel.Shop.title')"
    :exit-text="t('components.panel.Shop.exit')"
    v-bind="$attrs"
    @exit="closeShop"
  >
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
      />
    </div>
    <div v-if="selectedItem" class="tiny-scrollbar flex-1 overflow-auto">
      <ShopItemDetail v-model:qty="selectedQty" :item="selectedItem" />
    </div>
    <template #footer>
      <div class="flex flex-wrap gap-2 bg-white dark:bg-gray-900" md="flex-nowrap justify-end w-full">
        <UiButton
          v-if="selectedItem"
          :disabled="!canBuy"
          type="primary"
          class="flex flex-1 flex-wrap items-center gap-1"
          @click="buy"
        >
          {{ t('components.panel.Shop.buy', { qty: selectedQty }) }}
          <UiCurrencyAmount :amount="(selectedItem?.price ?? 0) * selectedQty" :currency="selectedItem?.currency ?? 'shlagidolar'" />
        </UiButton>
        <div class="w-full flex gap-1" md="flex-col w-auto">
          <UiButton
            v-if="selectedItem"
            class="w-full flex gap-2"
            variant="outline"
            type="danger"
            size="sm"
            @click="selectedItem = null"
          >
            <div class="i-carbon:return" />
            {{ t('components.panel.Shop.back') }}
          </UiButton>

          <UiButton type="danger" variant="outline" class="w-full flex gap-2" size="sm" @click="closeShop">
            <div class="i-carbon:exit" />
            {{ t('components.panel.Shop.exit') }}
          </UiButton>
        </div>
      </div>
    </template>
  </LayoutTitledPanel>
</template>
