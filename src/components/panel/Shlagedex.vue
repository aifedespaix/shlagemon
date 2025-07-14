<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { useFeatureLockStore } from '~/stores/featureLock'
import { useShlagedexStore } from '~/stores/shlagedex'

const dex = useShlagedexStore()
const featureLock = useFeatureLockStore()
const showDetail = ref(false)
const detailMon = ref<DexShlagemon | null>(dex.activeShlagemon)

const clickTimer = ref<number | null>(null)

function open(mon: DexShlagemon | null) {
  if (mon) {
    detailMon.value = mon
    showDetail.value = true
  }
}

function changeActive(mon: DexShlagemon) {
  if (featureLock.isShlagedexLocked)
    return
  dex.setActiveShlagemon(mon)
}

function onItemClick(mon: DexShlagemon) {
  if (clickTimer.value) {
    clearTimeout(clickTimer.value)
    clickTimer.value = null
    changeActive(mon)
  }
  else {
    clickTimer.value = window.setTimeout(() => {
      open(mon)
      clickTimer.value = null
    }, 300)
  }
}
</script>

<template>
  <ShlagemonList
    :mons="dex.shlagemons"
    show-checkbox
    :on-item-click="onItemClick"
  />
  <Modal v-model="showDetail" footer-close @close="showDetail = false">
    <ShlagemonDetail
      :mon="detailMon"
      @release="showDetail = false"
      @active="showDetail = false"
    />
  </Modal>
</template>
