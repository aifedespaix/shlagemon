<script setup lang="ts">
import type { DexShlagemon } from '~/types/shlagemon'
import { useShlagedexStore } from '~/stores/shlagedex'
import ShlagemonDetail from './ShlagemonDetail.vue'
import ShlagemonType from './ShlagemonType.vue'

const dex = useShlagedexStore()
const showDetail = ref(false)
const detailMon = ref<DexShlagemon | null>(dex.activeShlagemon)

function open(mon: DexShlagemon | null) {
  if (mon) {
    detailMon.value = mon
    showDetail.value = true
  }
}
</script>

<template>
  <section v-if="dex.shlagemons.length" class="p-2">
    <h2 class="mb-2 font-bold">
      Shlagedex
    </h2>
    <div class="flex flex-col gap-2">
      <div
        v-for="mon in dex.shlagemons"
        :key="mon.id"
        class="flex cursor-pointer items-center justify-between border rounded p-2"
        hover="bg-gray-100 dark:bg-gray-800"
        :class="{ 'bg-primary text-white': dex.activeShlagemon?.id === mon.id }"
        @click="open(mon)"
      >
        <div class="flex items-center gap-2">
          <img :src="`/shlagemons/${mon.id}/${mon.id}.png`" :alt="mon.name" class="h-10 w-10 object-contain">
          <div class="flex flex-col">
            <div class="name">
              {{ mon.name }}
            </div>
            <ShlagemonType :value="mon.type" />
          </div>
        </div>
        <CheckBox class="ml-2" @click.stop="dex.setActiveShlagemon(mon)">
          ✔
        </CheckBox>
      </div>
    </div>
    <ShlagemonDetail :mon="detailMon" :show="showDetail" @close="showDetail = false" />
  </section>
</template>
