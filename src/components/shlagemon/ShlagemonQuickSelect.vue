<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { useShlagedexStore } from '~/stores/shlagedex'
import ShlagemonImage from './ShlagemonImage.vue'
import ShlagemonType from './ShlagemonType.vue'

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

function isSelected(mon: DexShlagemon) {
  return props.selected.includes(mon.id)
}
</script>

<template>
  <div class="tiny-scrollbar max-h-60 flex flex-col gap-2 overflow-auto">
    <button
      v-for="mon in dex.shlagemons"
      :key="mon.id"
      class="flex items-center justify-between gap-2 border rounded p-2 text-left"
      :class="isSelected(mon) ? 'opacity-50' : ''"
      @click="choose(mon)"
    >
      <span class="w-6 text-xs font-bold">lvl {{ mon.lvl }}</span>
      <ShlagemonImage
        :id="mon.base.id"
        :alt="mon.base.name"
        :shiny="mon.isShiny"
        class="h-8 w-8 object-contain"
      />
      <div class="flex gap-1">
        <ShlagemonType v-for="t in mon.base.types" :key="t.id" :value="t" />
      </div>
      <span class="flex-1 truncate text-xs">{{ mon.base.name }}</span>
    </button>
  </div>
</template>
