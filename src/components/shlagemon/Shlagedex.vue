<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import Modal from '~/components/modal/Modal.vue'
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

function isActive(mon: DexShlagemon) {
  return dex.activeShlagemon?.id === mon.id
}
</script>

<template>
  <section v-if="dex.shlagemons.length" class="p-2">
    <div class="flex flex-col gap-2">
      <div
        v-for="mon in dex.shlagemons"
        :key="mon.id"
        class="relative flex cursor-pointer items-center justify-between border rounded p-2"
        hover="bg-gray-100 dark:bg-gray-800"
        :class="{ 'bg-primary/20': isActive(mon) }"
        :style="isActive(mon) ? { backgroundImage: `url(/shlagemons/${mon.base.id}/${mon.base.id}.png)`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' } : {}"
        @click.stop="open(mon)"
      >
        <div class="absolute bottom-0 right-2 text-xs">
          lvl {{ mon.lvl }}
        </div>
        <div class="flex items-center gap-2">
          <img :src="`/shlagemons/${mon.base.id}/${mon.base.id}.png`" :alt="mon.base.name" class="h-12 w-12 object-contain -m-y-2">
          <div class="flex flex-col">
            <div class="name">
              {{ mon.base.name }}
            </div>
            <div class="flex gap-1">
              <ShlagemonType
                v-for="t in mon.base.types"
                :key="t.id"
                :value="t"
              />
            </div>
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
    <Modal v-model="showDetail" footer-close @close="showDetail = false">
      <ShlagemonDetail :mon="detailMon" />
    </Modal>
  </section>
</template>
