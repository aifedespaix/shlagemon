<script setup lang="ts">
import UiButton from '~/components/ui/Button.vue'
import UiImageByBackground from '~/components/ui/ImageByBackground.vue'
import UiKbd from '~/components/ui/Kbd.vue'
import UiListItem from '~/components/ui/ListItem.vue'
import UiModal from '~/components/ui/Modal.vue'
import type { Item } from '~/type/item'
import { storeToRefs } from 'pinia'
import { badgeBox, eggBox, fabulousPotion, mysteriousPotion, specialPotion } from '~/data/items'
import { ballHues } from '~/utils/ball'

const props = defineProps<{
  item: Item
  qty: number
  disabled?: boolean
}>()
const emit = defineEmits<{
  (e: 'use'): void
  (e: 'sell'): void
}>()
const { t } = useI18n()

const usage = useItemUsageStore()
const shortcutStore = useShortcutsStore()
const shortcutModal = useItemShortcutModalStore()
const { shortcuts } = storeToRefs(shortcutStore)
const { isMobile } = storeToRefs(useUIStore())

// Animation / états
const showInfo = ref(false)
const zoom = ref(false)

// Types / catégories spéciales
const kingPotionIds = [fabulousPotion.id, mysteriousPotion.id, specialPotion.id] as const
const isEgg = computed(() => props.item.id.startsWith('oeuf-'))
const isBox = computed(() => props.item.id === eggBox.id || props.item.id === badgeBox.id)
const isKingPotion = computed(() => kingPotionIds.includes(props.item.id))
const isUnused = computed(() => !usage.used[props.item.id])

// Effet visuel si ball (teinte)
const ballFilter = computed(() =>
  'catchBonus' in props.item ? { filter: `hue-rotate(${ballHues[props.item.id]})` } : {},
)

// Infos pour la modale détaillée
const details = computed(() =>
  t(props.item.details ?? props.item.description),
)

// Libellé du bouton d'action selon le type d'item
const actionLabel = computed(() => {
  if (isBox.value)
    return t('components.inventory.ItemCard.action.open')
  if ('catchBonus' in props.item || props.item.wearable || isKingPotion.value) {
    return props.disabled
      ? t('components.inventory.ItemCard.action.equipped')
      : t('components.inventory.ItemCard.action.equip')
  }
  return t('components.inventory.ItemCard.action.use')
})

// Touche de raccourci associée
const shortcutKey = computed(() => {
  const entry = shortcuts.value.find(s => s.action.type === 'use-item' && s.action.itemId === props.item.id)
  return entry?.key || '?'
})

// Ouvre la modale d'affectation de raccourci
function openShortcutModal() {
  shortcutModal.open(props.item)
}

// Utilise l'item depuis la modale d'info
function useFromModal() {
  showInfo.value = false
  emit('use')
}

// Affiche la modale d'info, marque comme "vu"
function onCardClick() {
  showInfo.value = true
  usage.markUsed(props.item.id)
}

// Animation zoom rapide sur ouverture
watch(showInfo, (val) => {
  if (val) {
    zoom.value = true
    useTimeoutFn(() => (zoom.value = false), 200)
  }
})
</script>

<template>
  <UiListItem
    :active="showInfo"
    :highlight="isUnused"
    role="button"
    :aria-label="t(props.item.name)"
    @click="onCardClick"
  >
    <template #left>
      <div class="flex items-center justify-center h-7 w-7" sm="h-8 w-8">
      <div
        v-if="props.item.icon"
        class="w-full h-full"
        :class="[props.item.iconClass, props.item.icon]"
      />
        <UiImageByBackground
          v-else-if="props.item.image"
          :src="props.item.image"
          :alt="t(props.item.name)"
          class="w-full h-full"
          :style="ballFilter"
        />
      </div>
    </template>

    <!-- Contenu principal (nom, desc courte) -->
    <span class="block text-base font-semibold leading-snug" md="text-xs" lg="text-base">
      {{ t(props.item.name) }}
    </span>

    <template #right>
      <div class="min-w-8 w-20 flex flex-col items-end justify-center gap-1">
        <div class="w-full flex items-center justify-end gap-1" v-if="qty > 1 || !isMobile">
          <span
            v-if="qty > 1"
            class="flex-1 rounded bg-gray-100 px-1 py-0.5 text-center text-xs text-gray-700 font-bold dark:bg-gray-700 dark:text-gray-100"
          >x {{ qty }}</span>
          <UiKbd
            v-if="!isMobile"
            clickable
            size="sm"
            :key-name="shortcutKey"
            :title="t('components.inventory.ItemCard.shortcutTooltip')"
            @click.stop="openShortcutModal"
          />
        </div>
        <UiButton
          v-if="!isEgg"
          :disabled="props.disabled"
          size="xs"
          class="flex items-center justify-center gap-1 !w-full"
          :aria-label="actionLabel"
          @click.stop="emit('use')"
        >
          <div i-carbon-play />
          <span class="text-xs font-medium">{{ actionLabel }}</span>
        </UiButton>
      </div>
    </template>

    <UiModal v-model="showInfo" footer-close>
      <div class="flex flex-col items-center gap-2">
        <div
          v-if="props.item.icon"
          class="h-16 w-16"
          :class="[props.item.iconClass, props.item.icon]"
        />
        <img
          v-else-if="props.item.image"
          :src="props.item.image"
          :alt="t(props.item.name)"
          class="h-16 w-16 object-contain"
          :style="ballFilter"
        >
        <h3 class="text-lg font-bold">
          {{ t(props.item.name) }}
        </h3>
        <p class="text-center text-sm">
          {{ details }}
        </p>
        <UiButton
          v-if="!isEgg"
          class="flex items-center gap-1 text-xs"
          :disabled="props.disabled"
          size="sm"
          @click.stop="useFromModal"
        >
          <div i-carbon-play inline-block />
          {{ actionLabel }}
        </UiButton>
      </div>
    </UiModal>
  </UiListItem>
</template>
