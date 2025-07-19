<script setup lang="ts">
import type { BaseShlagemon } from '~/type/shlagemon'
import DeckDetail from '~/components/deck/DeckDetail.vue'
import DeckList from '~/components/deck/DeckList.vue'
import { allShlagemons } from '~/data/shlagemons'

const showDetail = ref(false)
const selected = ref<BaseShlagemon | null>(null)
const { t } = useI18n()
useHead({
  title: () => t('shlagedexPage.title'),
})

function open(mon: BaseShlagemon) {
  selected.value = mon
  showDetail.value = true
}
</script>

<template>
  <div class="mx-auto max-w-160 w-full p-4">
    <DeckList :mons="allShlagemons" :on-item-click="open" />
    <Modal v-model="showDetail" footer-close @close="showDetail = false">
      <DeckDetail :mon="selected" @open-mon="open" />
    </Modal>
  </div>
</template>
