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
    <UiPanelWrapper :title="t('components.zone.MonsModal.title', { zone: t(zone.current.name) })" is-inline>
      <template #icon>
        <img src="/items/shlageball/shlageball.webp" alt="ball" class="h-4 w-4">
      </template>
      <div class="flex flex-wrap justify-center gap-2 p-2">
        <div
          v-for="mon in mons"
          :key="mon.id"
          class="flex flex-col items-center text-xs"
        >
          <ShlagemonImage
            :id="mon.id"
            :alt="t(mon.name)"
            class="min-h-16 min-w-16 object-contain"
            :class="owned(mon.id) ? '' : 'grayscale opacity-50'"
          />
          <span>{{ t(mon.name) }}</span>
        </div>
      </div>
    </UiPanelWrapper>
  </UiModal>
</template>
