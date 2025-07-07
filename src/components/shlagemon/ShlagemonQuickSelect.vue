<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { useShlagedexStore } from '~/stores/shlagedex'
import ShlagemonImage from './ShlagemonImage.vue'

const emit = defineEmits<{ (e: 'select', mon: DexShlagemon): void }>()
const dex = useShlagedexStore()

function choose(mon: DexShlagemon) {
  dex.setActiveShlagemon(mon)
  emit('select', mon)
}
</script>

<template>
  <div class="flex flex-wrap justify-center gap-2">
    <button
      v-for="mon in dex.shlagemons"
      :key="mon.id"
      class="flex flex-col items-center"
      @click="choose(mon)"
    >
      <ShlagemonImage
        :id="mon.base.id"
        :alt="mon.base.name"
        :shiny="mon.isShiny"
        class="h-16 w-16 object-contain"
      />
      <span class="text-xs">{{ mon.base.name }}</span>
    </button>
  </div>
</template>
