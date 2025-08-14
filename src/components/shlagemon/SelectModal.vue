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
  selected?: string[]
  /** Disable selection interactions. */
  locked?: boolean
  /** Whether selecting also sets the active combatant. */
  selectsActive?: boolean
  /** Optional ID for the title element (used for aria-labelledby). */
  titleId?: string
}

const props = withDefaults(defineProps<Props>(), {
  selected: () => [],
  locked: false,
  selectsActive: true,
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

function onSelect(mon: DexShlagemon) {
  emit('select', mon)
  open.value = false
}
</script>

<template>
  <UiModal v-model="open" footer-close :aria-labelledby="headingId">
    <div class="flex flex-col gap-2">
      <h3 :id="headingId" class="text-center text-lg font-bold">
        {{ title }}
      </h3>
      <ShlagemonQuickSelect
        v-if="dex.shlagemons.length"
        class="max-h-60vh"
        :selected="selected"
        :locked="locked"
        :selects-active="selectsActive"
        @select="onSelect"
      />
      <p v-else class="text-center text-sm">
        {{ t('components.shlagemon.SelectModal.noAvailable') }}
      </p>
    </div>
  </UiModal>
</template>
