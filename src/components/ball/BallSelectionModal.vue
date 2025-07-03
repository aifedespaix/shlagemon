<script setup lang="ts">
import Modal from '~/components/modal/Modal.vue'
import Button from '~/components/ui/Button.vue'
import { balls } from '~/data/items/shlageball'
import { useBallStore } from '~/stores/ball'
import { useInventoryStore } from '~/stores/inventory'
import { ballHues } from '~/utils/ball'

const inventory = useInventoryStore()
const ballStore = useBallStore()

const options = computed(() =>
  balls.map(b => ({ ...b, qty: inventory.items[b.id] || 0 })),
)

function choose(id: string) {
  ballStore.setBall(id as any)
}
</script>

<template>
  <Modal v-model="ballStore.isVisible" footer-close>
    <div class="flex flex-col items-center gap-2">
      <h3 class="text-lg font-bold">
        Choix de la Schlagéball
      </h3>
      <p class="text-center text-sm">
        La Super et l'Hyper Schlagéball améliorent vos chances de capture
        (x1.5 et x2).
      </p>
      <Button
        v-for="ball in options"
        :key="ball.id"
        class="flex items-center gap-2"
        :disabled="ball.qty <= 0"
        @click="choose(ball.id)"
      >
        <img
          :src="ball.image"
          :alt="ball.name"
          class="h-8 w-8"
          :style="{ filter: `hue-rotate(${ballHues[ball.id]})` }"
        >
        {{ ball.name }} (x{{ ball.qty }})
      </Button>
    </div>
  </Modal>
</template>
