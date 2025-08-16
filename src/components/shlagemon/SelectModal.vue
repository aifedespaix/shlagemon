<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'

/**
 * Modal wrapper to select a Shlagémon from the player's collection.
 * Emits the selected Shlagémon and closes itself.
 */
interface Props {
  /** Whether the modal is visible. */
  modelValue: boolean
  /** Displayed title of the modal. */
  title: string
  /** IDs of pre-selected Shlagémons. */
  selectedIds?: string[]
  /** IDs of disabled Shlagémons. */
  disabledIds?: string[]
  /** Disable selection interactions. */
  locked?: boolean
  /** Whether selecting also sets the active combatant. */
  selectsActive?: boolean
  /**
   * Close the modal automatically when a Shlagémon is selected.
   * Defaults to `true` to preserve current behaviour.
   */
  closeOnSelect?: boolean
  /** Optional ID for the title element (used for aria-labelledby). */
  titleId?: string
}

const props = withDefaults(defineProps<Props>(), {
  selectedIds: () => [],
  disabledIds: () => [],
  locked: false,
  selectsActive: false,
  closeOnSelect: true,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'select', mon: DexShlagemon): void
}>()

const open = useVModel(props, 'modelValue', emit)
const defaultTitleId = useId()
const headingId = computed(() => props.titleId || defaultTitleId)
const dex = useShlagedexStore()
const { t } = useI18n()

function handleClick(mon: DexShlagemon) {
  if (props.selectsActive)
    dex.setActiveShlagemon(mon)
  emit('select', mon)
  if (props.closeOnSelect)
    open.value = false
}

function handleActivate(mon: DexShlagemon) {
  if (props.selectsActive)
    dex.setActiveShlagemon(mon)
}
</script>

<template>
  <UiModal v-model="open" footer-close :aria-labelledby="headingId">
    <div class="flex flex-col gap-2">
      <h3 :id="headingId" class="text-center text-lg font-bold">
        {{ title }}
      </h3>
      <p v-if="locked" class="text-center text-sm">
        {{ t('components.shlagemon.SelectModal.locked') }}
      </p>
      <ShlagemonListGeneric
        v-if="dex.shlagemons.length"
        class="max-h-60vh"
        :highlight-ids="selectedIds"
        :disabled-ids="disabledIds"
        :locked="locked"
        :active-id="dex.activeShlagemon?.id"
        :on-item-click="handleClick"
        :on-item-activate="selectsActive ? handleActivate : undefined"
      />
      <p v-else class="text-center text-sm">
        {{ t('components.shlagemon.SelectModal.noAvailable') }}
      </p>
      <slot />
    </div>
  </UiModal>
</template>
