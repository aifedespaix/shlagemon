<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { multiExp } from '~/data/items'

const { t } = useI18n()
const dex = useShlagedexStore()
const equipment = useEquipmentStore()
const inventory = useInventoryStore()
const wearableItem = useWearableItemStore()
const dexDetailModal = useDexDetailModalStore()

const showDetail = ref(false)
const detailMon = ref<DexShlagemon | null>(dex.activeShlagemon)

/** Number of newly obtained Shlagémons not yet acknowledged. */
const newCount = computed(() => dex.newCount)
/** Shlagémon currently holding the Multi Exp, if any. */
const multiExpHolder = computed(() => {
  const holderId = equipment.getHolder(multiExp.id)
  return holderId ? dex.shlagemons.find(m => m.id === holderId) || null : null
})

/** Whether the player owns the Multi Exp, either equipped or in inventory. */
const ownsMultiExp = computed(() => {
  return (inventory.items[multiExp.id] || 0) > 0 || Boolean(multiExpHolder.value)
})

/** Handle click on the Multi Exp button. */
function handleMultiExpClick() {
  if (multiExpHolder.value)
    dexDetailModal.open(multiExpHolder.value)
  else
    wearableItem.open(multiExp)
}

/** Open the detail modal for a given Shlagémon. */
function open(mon: DexShlagemon | null) {
  if (mon) {
    dex.markSeen(mon)
    detailMon.value = mon
    showDetail.value = true
  }
}

/** Forwarded click handler from the list component. */
function onItemClick(mon: DexShlagemon) {
  open(mon)
}
</script>

<template>
  <ShlagemonListGeneric
    show-checkbox
    :active-id="dex.activeShlagemon?.id"
    :on-item-click="onItemClick"
    :on-item-activate="dex.setActiveShlagemon"
  >
    <template #header-extra>
      <UiButton
        v-if="ownsMultiExp"
        v-tooltip="t(multiExp.name)"
        :class="{ 'saturate-0': !multiExpHolder }"
        icon
        size="xs"
        variant="outline"
        type="primary"
        @click="handleMultiExpClick"
      >
        <span :class="[multiExp.icon, multiExp.iconClass]" />
      </UiButton>
    </template>
    <template #content-top>
      <div v-if="newCount > 0" class="mb-1">
        <UiInfo
          color="info"
          class="col-span-2 row-start-3"
          ok-button
          @ok="dex.markAllSeen"
        >
          {{ t('components.panel.Shlagedex.new', newCount) }}
        </UiInfo>
      </div>
    </template>
  </ShlagemonListGeneric>
  <UiModal
    v-model="showDetail"
    footer-close
    :golden-border="detailMon?.rarity === 100"
    @close="showDetail = false"
  >
    <ShlagemonDetail
      :mon="detailMon"
      @release="showDetail = false"
      @active="showDetail = false"
    />
  </UiModal>
</template>
