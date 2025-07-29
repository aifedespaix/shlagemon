<script setup lang="ts">
import type { Item } from '~/type/item'

const props = withDefaults(defineProps<{ item: Item, qty?: number }>(), { qty: 1 })

const emit = defineEmits<{ (e: 'update:qty', value: number): void }>()

const { t } = useI18n()

const game = useGameStore()
const qty = ref(props.qty)

const playerMoney = computed(() =>
  props.item.currency === 'shlagidiamond'
    ? game.shlagidiamond
    : game.shlagidolar,
)

const maxQty = computed(() =>
  Math.max(1, Math.floor(playerMoney.value / (props.item.price ?? 0))),
)

const steps = [1, 10, 100, 1000]

const availableSteps = computed(() =>
  steps.filter(step => step === 1 || playerMoney.value >= step * (props.item.price ?? 0)),
)

watch(() => props.qty, (v) => {
  qty.value = v
})

watch(qty, (v) => {
  if (v < 1)
    qty.value = 1
  else if (v > maxQty.value)
    qty.value = maxQty.value
  emit('update:qty', qty.value)
})

function adjustQty(v: number) {
  qty.value += v
}

function setMax() {
  qty.value = maxQty.value
}

const details = computed(() =>
  t(props.item.details ?? props.item.description),
)
</script>

<template>
  <div class="h-full flex flex-col gap-2">
    <div class="flex items-center gap-2">
      <div
        v-if="props.item.icon"
        class="h-10 w-10"
        :class="[props.item.iconClass, props.item.icon]"
      />
      <img v-else-if="props.item.image" :src="props.item.image" :alt="t(props.item.name)" class="h-10 w-10 object-contain">
      <h3 class="text-lg font-bold">
        {{ t(props.item.name) }}
      </h3>
    </div>
    <div class="flex items-center gap-1">
      Prix Unitaire <UiCurrencyAmount :amount="props.item.price ?? 0" :currency="props.item.currency ?? 'shlagidolar'" />
    </div>
    <p class="text-sm">
      {{ details }}
    </p>
    <div class="mt-2 flex flex-wrap items-center gap-2">
      <div
        v-for="step in availableSteps"
        :key="step"
        class="flex flex-col gap-1"
      >
        <UiButton
          :disabled="qty >= maxQty"
          class="text-sm"
          type="primary"
          @click="adjustQty(step)"
        >
          + {{ step.toLocaleString() }}
        </UiButton>
        <UiButton
          :disabled="qty <= 1"
          type="danger"
          class="text-xs"
          @click="adjustQty(-step)"
        >
          - {{ step.toLocaleString() }}
        </UiButton>
      </div>
      <div class="flex items-center gap-2">
        <UiButton :disabled="qty >= maxQty" @click="setMax">
          MAX
        </UiButton>
        <div class="w-20">
          <UiNumberInput v-model="qty" :min="1" :max="maxQty" />
        </div>
      </div>
    </div>
  </div>
</template>
