<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'

const dex = useShlagedexStore()
const showDetail = ref(false)
const detailMon = ref<DexShlagemon | null>(dex.activeShlagemon)


function open(mon: DexShlagemon | null) {
  if (mon) {
    dex.markSeen(mon)
    detailMon.value = mon
    showDetail.value = true
  }
}

function onItemClick(mon: DexShlagemon) {
  open(mon)
}
</script>

<template>
  <ShlagemonList
    :mons="dex.shlagemons"
    show-checkbox
    :on-item-click="onItemClick"
  />
  <UiModal
    v-model="showDetail"
    footer-close
    :golden-border="detailMon?.rarity === 100"
    @close="showDetail = false"
  >
    <ShlagemonDetail
      :mon="detailMon"
      @release="showDetail = false"
      @active="showDetail = false"
    />
  </UiModal>
</template>
