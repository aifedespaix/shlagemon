<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'

const dex = useShlagedexStore()
const featureLock = useFeatureLockStore()
const showDetail = ref(false)
const detailMon = ref<DexShlagemon | null>(dex.activeShlagemon)

const clickTimer = ref<UseTimeoutFnReturn | null>(null)

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
    clickTimer.value.stop()
    clickTimer.value = null
    changeActive(mon)
  }
  else {
    clickTimer.value = useTimeoutFn(() => {
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
  <Modal
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
  </Modal>
</template>
