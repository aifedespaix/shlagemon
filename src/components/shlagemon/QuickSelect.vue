<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'

interface Props {
  selected?: string[]
  locked?: boolean
  /**
   * Whether selecting a Shlagémon should mark it as the active combatant.
   * Defaults to `true` to preserve existing behaviour.
   */
  selectsActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  selected: () => [],
  locked: false,
  selectsActive: true,
})
const emit = defineEmits<{ (e: 'select', mon: DexShlagemon): void }>()
const dex = useShlagedexStore()

function choose(mon: DexShlagemon) {
  if (props.selectsActive)
    dex.setActiveShlagemon(mon)
  emit('select', mon)
}
</script>

<template>
  <ShlagemonList
    :mons="dex.shlagemons"
    :highlight-ids="props.selected"
    :on-item-click="choose"
    :locked="props.locked"
  />
</template>
