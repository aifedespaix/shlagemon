<script setup lang="ts">
import type { BallId } from '~/data/items/shlageball'
import { balls } from '~/data/items/shlageball'
import { ballHues } from '~/utils/ball'

const inventory = useInventoryStore()
const ballStore = useBallStore()

const options = computed(() =>
  balls.map(b => ({ ...b, qty: inventory.items[b.id] || 0 })),
)

function choose(id: BallId) {
  ballStore.setBall(id)
}
</script>

<template>
  <UiModal v-model="ballStore.isVisible" footer-close>
    <div class="flex flex-col items-center gap-2">
      <h3 class="text-lg font-bold">
        Choix de la Shlagéball
      </h3>
      <p class="text-center text-sm">
        La Super et l'Hyper Shlagéball améliorent vos chances de capture
        (x1.5 et x2).
      </p>
      <UiButton
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
      </UiButton>
    </div>
  </UiModal>
</template>
