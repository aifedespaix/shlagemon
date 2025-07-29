<script setup lang="ts">
import type { BallId } from '~/data/items/shlageball'
import { balls } from '~/data/items/shlageball'
import { ballHues } from '~/utils/ball'

const inventory = useInventoryStore()
const ballStore = useBallStore()
const { t } = useI18n()

const options = computed(() =>
  balls.map(b => ({ ...b, qty: inventory.items[b.id] || 0 })),
)

function choose(id: BallId) {
  ballStore.equip(id)
}
</script>

<template>
  <UiModal v-model="ballStore.isVisible" footer-close>
    <div class="flex flex-col items-center gap-2">
      <h3 class="text-lg font-bold">
        {{ t('components.ball.SelectionModal.title') }}
      </h3>
      <p class="text-center text-sm">
        {{ t('components.ball.SelectionModal.info') }}
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
