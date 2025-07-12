<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { storeToRefs } from 'pinia'
import Modal from '~/components/modal/Modal.vue'
import { useFeatureLockStore } from '~/stores/featureLock'
import { useMobileTabStore } from '~/stores/mobileTab'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useUIStore } from '~/stores/ui'
import ShlagemonDetail from './ShlagemonDetail.vue'
import ShlagemonList from './ShlagemonList.vue'

const dex = useShlagedexStore()
const featureLock = useFeatureLockStore()
const showDetail = ref(false)
const detailMon = ref<DexShlagemon | null>(dex.activeShlagemon)
const mobile = useMobileTabStore()
const { isMobile } = storeToRefs(useUIStore())

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
  if (isMobile.value)
    mobile.set('game')
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
