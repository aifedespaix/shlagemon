<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { useShlagedexStore } from '~/stores/shlagedex'

interface Props {
  selected?: string[]
}

const props = withDefaults(defineProps<Props>(), { selected: () => [] })
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
    :show-checkbox="false"
    :highlight-ids="props.selected"
    :on-item-click="choose"
  />
</template>
