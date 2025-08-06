<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'

interface Props {
  selected?: string[]
  locked?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  selected: () => [],
  locked: false,
})
const emit = defineEmits<{ (e: 'select', mon: DexShlagemon): void }>()
const dex = useShlagedexStore()

function choose(mon: DexShlagemon) {
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
