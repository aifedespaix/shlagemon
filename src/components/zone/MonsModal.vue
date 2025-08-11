<script setup lang="ts">
const modal = useZoneMonsModalStore()
const zone = useZoneStore()
const dex = useShlagedexStore()
const { t } = useI18n()

const mons = computed(() => zone.current.shlagemons || [])
function owned(id: string) {
  return dex.shlagemons.some(m => m.base.id === id)
}
</script>

<template>
  <UiModal v-model="modal.isVisible" footer-close>
    <div class="flex items-center gap-1">
      <img src="/items/shlageball/shlageball.webp" alt="ball" class="h-4 w-4">
      {{ t('components.zone.MonsModal.title', { zone: t(zone.current.name) }) }}
    </div>
    <div class="flex flex-wrap justify-center gap-2 p-2">
      <div
        v-for="mon in mons"
        :key="mon.id"
        class="flex flex-col items-center gap-2"
      >
        <ShlagemonImage
          :id="mon.id"
          :alt="t(mon.name)"
          class="min-h-16 min-w-16 max-w-24! object-contain"
          :class="owned(mon.id) ? '' : 'grayscale opacity-50'"
        />
        <span>{{ t(mon.name) }}</span>
      </div>
    </div>
  </UiModal>
</template>
