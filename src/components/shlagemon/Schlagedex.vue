<script setup lang="ts">
import { useSchlagedexStore } from '~/stores/schlagedex'
import ShlagemonDetail from './ShlagemonDetail.vue'
import ShlagemonType from './ShlagemonType.vue'

const dex = useSchlagedexStore()
const showDetail = ref(false)
const detailMon = ref(dex.activeShlagemon as any)

function open(mon: typeof dex.activeShlagemon.value) {
  if (mon) {
    detailMon.value = mon
    showDetail.value = true
  }
}
</script>

<template>
  <section v-if="dex.shlagemons.length" class="p-2">
    <h2 class="mb-2 font-bold">
      Schlagedex
    </h2>
    <div class="flex flex-col gap-2">
      <div
        v-for="mon in dex.shlagemons"
        :key="mon.id"
        class="flex cursor-pointer items-center justify-between border rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
        :class="{ 'bg-primary text-white': dex.activeShlagemon?.id === mon.id }"
        @click="open(mon)"
      >
        <div class="flex items-center gap-2">
          <img :src="`/shlagemons/${mon.id}/${mon.id}.png`" :alt="mon.name" class="h-10 w-10 object-contain">
          <div class="name">
            {{ mon.name }}
          </div>
        </div>
        <ShlagemonType :value="mon.type" />
        <button class="ml-2" @click.stop="dex.setActiveShlagemon(mon)">
          ✔
        </button>
      </div>
    </div>
    <ShlagemonDetail :mon="detailMon" :show="showDetail" @close="showDetail = false" />
  </section>
</template>
