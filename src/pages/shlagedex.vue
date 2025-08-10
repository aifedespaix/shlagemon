<script setup lang="ts">
import type { BaseShlagemon } from '~/type/shlagemon'
import { allShlagemons } from '~/data/shlagemons'

const showDetail = ref(false)
const selected = ref<BaseShlagemon | null>(null)
const { t } = useI18n()
usePageHead({
  title: () => t('pages.shlagedex.title'),
})

function open(mon: BaseShlagemon) {
  selected.value = mon
  showDetail.value = true
}
</script>

<template>
  <div class="mx-auto h-full max-w-160 w-full p-4">
    <DeckList
      :mons="allShlagemons"
      :on-item-click="open"
      :selected-id="selected?.id"
    />
    <UiModal v-model="showDetail" footer-close @close="showDetail = false">
      <DeckDetail :mon="selected" @open-mon="open" />
    </UiModal>
    <ShlagemonTypeChartModal />
  </div>
</template>
