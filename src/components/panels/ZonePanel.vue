<script setup lang="ts">
import Modal from '~/components/modal/Modal.vue'
import ShopPanel from '~/components/panels/ShopPanel.vue'
import Button from '~/components/ui/Button.vue'
import { useZoneStore } from '~/stores/zone'

const zone = useZoneStore()
const showShop = ref(false)

function onAction(id: string) {
  if (id === 'shop') {
    showShop.value = true
  }
}
</script>

<template>
  <div class="flex flex-col gap-2" md="gap-3">
    <div class="flex flex-wrap justify-center gap-1" md="gap-2">
      <button
        v-for="z in zone.zones"
        :key="z.id"
        class="rounded px-2 py-1 text-xs"
        :class="z.id === zone.current.id ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-700'"
        @click="zone.setZone(z.id)"
      >
        {{ z.name }}
      </button>
    </div>
    <div class="flex flex-col items-center gap-1" md="gap-2">
      <span class="font-bold">{{ zone.current.name }}</span>
      <Button
        v-for="action in zone.current.actions"
        :key="action.id"
        class="text-xs"
        @click="onAction(action.id)"
      >
        {{ action.label }}
      </Button>
    </div>
  </div>
  <Modal v-model="showShop" @close="showShop = false">
    <ShopPanel />
  </Modal>
</template>
