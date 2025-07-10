<script setup lang="ts">
import Modal from '~/components/modal/Modal.vue'
import ShlagemonImage from '~/components/shlagemon/ShlagemonImage.vue'
import PanelWrapper from '~/components/ui/PanelWrapper.vue'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useZoneStore } from '~/stores/zone'
import { useZoneMonsModalStore } from '~/stores/zoneMonsModal'

const modal = useZoneMonsModalStore()
const zone = useZoneStore()
const dex = useShlagedexStore()

const mons = computed(() => zone.current.shlagemons || [])
function owned(id: string) {
  return dex.shlagemons.some(m => m.base.id === id)
}
</script>

<template>
  <Modal v-model="modal.isVisible" footer-close>
    <PanelWrapper :title="`Shlagémons de ${zone.current.name}`" is-inline>
      <template #icon>
        <img src="/items/shlageball/shlageball.png" alt="ball" class="h-4 w-4">
      </template>
      <div class="flex flex-wrap justify-center gap-2 p-2">
        <div
          v-for="mon in mons"
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
    </PanelWrapper>
  </Modal>
</template>
