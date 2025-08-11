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
    <div class="flex items-center gap-1">
      <div v-if="modal.item?.icon" class="h-6 w-6" :class="[modal.item.icon, modal.item.iconClass]" />
      {{ t('components.egg.MonsModal.title', { name: modal.item ? t(modal.item.name) : '' }) }}
    </div>

    <div class="tiny-scrollbar flex flex-wrap justify-center gap-2 overflow-auto p-2">
      <div
        v-for="mon in modal.mons"
        :key="mon.id"
        class="flex flex-col items-center"
      >
        <ShlagemonImage
          :id="mon.id"
          :alt="t(mon.name)"
          class="min-h-16 min-w-16 object-contain max-w-24!"
          :class="owned(mon.id) ? '' : 'grayscale opacity-50'"
        />
        <span>{{ t(mon.name) }}</span>
      </div>
    </div>
  </UiModal>
</template>
