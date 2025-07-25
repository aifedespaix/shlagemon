<script setup lang="ts">
const modal = useEggMonsModalStore()
const dex = useShlagedexStore()
const { t } = useI18n()

function owned(id: string) {
  return dex.shlagemons.some(m => m.base.id === id)
}
</script>

<template>
  <UiModal v-model="modal.isVisible" footer-close>
    <UiPanelWrapper
      :title="t('components.egg.MonsModal.title', { name: modal.item?.name })"
      is-inline
    >
      <template #icon>
        <div v-if="modal.item?.icon" class="h-4 w-4" :class="[modal.item.icon, modal.item.iconClass]" />
      </template>
      <div class="tiny-scrollbar max-h-60vh flex flex-wrap justify-center gap-2 overflow-auto p-2">
        <div
          v-for="mon in modal.mons"
          :key="mon.id"
          class="flex flex-col items-center text-xs"
        >
          <ShlagemonImage
            :id="mon.id"
            :alt="mon.name"
            class="min-h-16 min-w-16 object-contain"
            :class="owned(mon.id) ? '' : 'grayscale opacity-50'"
          />
          <span>{{ mon.name }}</span>
        </div>
      </div>
    </UiPanelWrapper>
  </UiModal>
</template>
