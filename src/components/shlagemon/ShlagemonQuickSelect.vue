<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { useShlagedexStore } from '~/stores/shlagedex'
import ShlagemonList from './ShlagemonList.vue'

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
    :disabled-ids="props.selected"
    :on-item-click="choose"
  />
</template>
