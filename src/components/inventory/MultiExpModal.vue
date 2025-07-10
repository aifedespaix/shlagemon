<script setup lang="ts">
import { computed } from 'vue'
import Modal from '~/components/modal/Modal.vue'
import ShlagemonImage from '~/components/shlagemon/ShlagemonImage.vue'
import Button from '~/components/ui/Button.vue'
import { allItems } from '~/data/items/items'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useWearableItemStore } from '~/stores/wearableItem'

const store = useWearableItemStore()
const dex = useShlagedexStore()

const itemName = computed(() =>
  allItems.find(i => i.id === store.currentId)?.name || '',
)

function select(monId: string) {
  store.equip(monId)
}
</script>

<template>
  <Modal v-model="store.isVisible" footer-close>
    <div class="flex flex-col gap-2">
      <h3 class="text-center text-lg font-bold">
        Choisir le porteur de {{ itemName }}
      </h3>
      <div v-if="dex.shlagemons.length" class="flex flex-col gap-2">
        <div
          v-for="mon in dex.shlagemons"
          :key="mon.id"
          class="flex items-center justify-between border rounded p-2"
          :class="store.holderId === mon.id ? 'bg-orange-100 dark:bg-orange-900' : ''"
        >
          <div class="flex items-center gap-2">
            <ShlagemonImage :id="mon.base.id" :alt="mon.base.name" class="h-6 w-6" />
            <span>{{ mon.base.name }} (lvl {{ mon.lvl }})</span>
          </div>
          <Button class="text-xs" @click="select(mon.id)">
            <span v-if="store.holderId === mon.id">Équipé</span>
            <span v-else>Choisir</span>
          </Button>
        </div>
      </div>
      <p v-else class="text-center text-sm">
        Aucun Shlagémon disponible.
      </p>
    </div>
  </Modal>
</template>
