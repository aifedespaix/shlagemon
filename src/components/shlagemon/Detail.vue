<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import WearableItemIcon from '~/components/inventory/WearableItemIcon.vue'
import ShlagemonStats from '~/components/shlagemon/Stats.vue'
import { allItems } from '~/data/items'
import { useDexDetailModalStore } from '~/stores/dexDetailModal'

const props = defineProps<{ mon: DexShlagemon | null }>()
const emit = defineEmits<{
  (e: 'release'): void
  (e: 'active'): void
}>()

const { t } = useI18n()
const stats = computed(() => {
  if (!props.mon)
    return []
  return [
    { label: t('components.shlagemon.Detail.hp'), value: props.mon.hp },
    { label: t('components.shlagemon.Detail.attack'), value: props.mon.attack },
    { label: t('components.shlagemon.Detail.defense'), value: props.mon.defense },
    { label: t('components.shlagemon.Detail.smell'), value: props.mon.smelling },
  ]
})

const allowEvolution = computed({
  get: () => props.mon?.allowEvolution ?? true,
  set: (val: boolean) => {
    if (props.mon)
      // eslint-disable-next-line vue/no-mutating-props
      (props.mon.allowEvolution = val)
  },
})

const store = useShlagedexStore()
const wearableItemStore = useWearableItemStore()
const equipModal = useWearableEquipModalStore()
const disease = useDiseaseStore()
const detailModal = useDexDetailModalStore()
const showConfirm = ref(false)

const heldItem = computed(() => {
  if (!props.mon?.heldItemId)
    return null
  return allItems.find(i => i.id === props.mon!.heldItemId) || null
})

const ownedEvolution = computed(() => {
  if (!props.mon?.base.evolution)
    return null
  return store.shlagemons.find(m => m.base.id === props.mon!.base.evolution!.base.id) || null
})

const evolutionInfo = computed(() => {
  if (!props.mon?.base.evolution)
    return null
  const { condition } = props.mon.base.evolution
  if (condition.type === 'lvl')
    return t('components.shlagemon.Detail.evolveByLevel', { level: condition.value })
  if (condition.type === 'item')
    return t('components.shlagemon.Detail.evolveByItem', { item: t(condition.value.name) })
  return null
})

const isActive = computed(() => props.mon?.id === store.activeShlagemon?.id)

function setActive() {
  if (props.mon) {
    store.setActiveShlagemon(props.mon)
    emit('active')
  }
}

const isActiveAndSick = computed(() =>
  disease.active && props.mon?.id === store.activeShlagemon?.id,
)

function requestRelease() {
  showConfirm.value = true
}

function confirmRelease() {
  if (props.mon)
    store.releaseShlagemon(props.mon)
  emit('release')
  showConfirm.value = false
}

function cancelRelease() {
  showConfirm.value = false
}

function openEquip() {
  if (props.mon)
    equipModal.open(props.mon)
}

function openOwnedEvolution() {
  if (ownedEvolution.value)
    detailModal.open(ownedEvolution.value)
}
const captureInfo = computed(() => {
  if (!props.mon)
    return { date: '', count: 0 }
  const date = new Date(props.mon.captureDate).toLocaleDateString()
  return { date, count: props.mon.captureCount }
})
</script>

<template>
  <div class="tiny-scrollbar h-full w-full overflow-y-auto">
    <div
      v-if="mon"
      class="max-w-xl w-full flex flex-col gap-2 rounded bg-white dark:bg-gray-900"
    >
      <h2 class="flex items-center justify-between text-lg font-bold">
        <div class="flex items-center gap-1">
          <span :class="mon.isShiny ? 'shiny-text' : ''">{{ mon.base.name }}</span>
          - lvl {{ mon.lvl }}<span v-if="isActiveAndSick"> ({{ t('components.shlagemon.Detail.sick') }})</span>
        </div>
        <ShlagemonRarityInfo :rarity="mon.rarity" class="rounded-tr-0" />
      </h2>
      <div class="relative h-40 w-full flex justify-center">
        <ShlagemonImage
          :id="mon.base.id"
          :alt="mon.base.name"
          :shiny="mon.isShiny"
          class="w-full object-contain"
        />
        <div class="absolute left-0 top-0 flex gap-2">
          <ShlagemonType
            v-for="type in mon.base.types"
            :key="type.id"
            :value="type"
            open-on-click
          />
        </div>
        <div class="absolute right-0 top-0 flex items-center gap-1">
          <template v-if="heldItem">
            <WearableItemIcon
              :item="heldItem"
              class="h-5 w-5"
            />
            <UiTooltip :text="t('components.shlagemon.Detail.unequipItemTooltip')">
              <UiButton
                type="icon"
                size="xs"
                @click="wearableItemStore.removeHolder(heldItem.id)"
              >
                <div i-carbon-trash-can />
              </UiButton>
            </UiTooltip>
          </template>
          <UiButton
            v-else
            type="icon"
            size="xs"
            :title="t('components.shlagemon.Detail.equipItemTitle')"
            @click="openEquip"
          >
            <div i-carbon-add />
          </UiButton>
        </div>
      </div>
      <div v-if="evolutionInfo" class="flex-center flex-col gap-1">
        <button
          v-if="ownedEvolution"
          type="button"
          class="rounded-full bg-blue-200 px-2 py-0.5 text-xs text-blue-800 dark:bg-blue-700 dark:text-blue-200"
          hover="bg-blue-300 dark:bg-blue-600"
          @click="openOwnedEvolution"
        >
          {{ evolutionInfo }}
        </button>
        <div
          v-else
          class="rounded-full bg-blue-200 px-2 py-0.5 text-xs text-blue-800 dark:bg-blue-700 dark:text-blue-200"
        >
          {{ evolutionInfo }}
        </div>
        <UiCheckBox v-model="allowEvolution" class="flex items-center gap-2 text-xs">
          {{ t('components.shlagemon.Detail.allowEvolution') }}
        </UiCheckBox>
      </div>
      <p class="tiny-scrollbar max-h-25 overflow-auto text-sm italic">
        {{ t(mon.base.description) }}
      </p>
      <ShlagemonStats :stats="stats" />
      <ShlagemonXpBar :mon="mon" />
      <div class="w-full flex items-center justify-center gap-2 text-xs">
        <p class="">
          {{ t('components.shlagemon.Detail.firstCatch', { date: captureInfo.date }) }}
        </p>
        <p>
          {{ t('components.shlagemon.Detail.obtainedTimes', { count: captureInfo.count }) }}
        </p>
      </div>
      <div class="flex justify-end gap-2">
        <UiButton type="danger" class="flex items-center gap-1" @click="requestRelease">
          <div i-carbon-trash-can />
          {{ t('components.shlagemon.Detail.release') }}
        </UiButton>
        <UiButton
          type="primary"
          class="flex flex-1 items-center gap-1"
          :disabled="isActive"
          @click="setActive"
        >
          <div i-carbon-star-filled />
          {{ t('components.shlagemon.Detail.main') }}
        </UiButton>
      </div>
      <UiModal v-model="showConfirm" :close-on-outside-click="false">
        <div class="flex flex-col items-center gap-4">
          <h3 class="text-lg font-bold">
            {{ t('components.shlagemon.Detail.confirmTitle') }}
          </h3>
          <p class="text-center text-sm">
            {{ t('components.shlagemon.Detail.confirmText') }}
          </p>
          <div class="flex gap-2">
            <UiButton tyb="valid" class="flex items-center gap-1" @click="confirmRelease">
              <div i-carbon-checkmark />
              {{ t('components.shlagemon.Detail.yes') }}
            </UiButton>
            <UiButton type="danger" class="flex items-center gap-1" @click="cancelRelease">
              <div i-carbon-close />
              {{ t('components.shlagemon.Detail.no') }}
            </UiButton>
          </div>
        </div>
      </UiModal>
    </div>
  </div>
</template>

<style scoped>
.shiny-text {
  background: linear-gradient(90deg, #ff00cc, #3333ff, #00ffff, #00ff00, #ffff00, #ff9900, #ff0000);
  background-size: 400% 400%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shiny-rainbow 5s linear infinite;
  display: inline-block;
}

@keyframes shiny-rainbow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
