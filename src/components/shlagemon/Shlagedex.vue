<script setup lang="ts">
import type { DexShlagemon } from '~/types/shlagemon'
import Modal from '~/components/modal/Modal.vue'
import ShlagemonDetail from './ShlagemonDetail.vue'
import ShlagemonType from './ShlagemonType.vue'

const dex = useShlagedexStore()
const showDetail = ref(false)
const detailMon = ref<DexShlagemon | null>(dex.activeShlagemon)

function open(mon: DexShlagemon | null) {
  if (mon) {
    dex.setActiveShlagemon(mon)
    detailMon.value = mon
    showDetail.value = true
  }
}

function isActive(mon: DexShlagemon) {
  return dex.activeShlagemon?.id === mon.id
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
        :class="{ 'bg-primary/20': isActive(mon) }"
        :style="isActive(mon) ? { backgroundImage: `url(/shlagemons/${mon.id}/${mon.id}.png)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
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
        <CheckBox
          class="ml-2"
          :model-value="isActive(mon)"
          @update:model-value="() => dex.setActiveShlagemon(mon)"
          @click.stop
        />
      </div>
    </div>
    <Modal v-model="showDetail">
      <ShlagemonDetail :mon="detailMon" @close="showDetail = false" />
    </Modal>
  </section>
</template>
