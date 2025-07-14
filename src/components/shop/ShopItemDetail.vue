<script setup lang="ts">
import type { Item } from '~/type/item'
import { useGameStore } from '~/stores/game'
import { useInventoryStore } from '~/stores/inventory'

const props = defineProps<{ item: Item }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const game = useGameStore()
const inventory = useInventoryStore()
const qty = ref(1)

const maxQty = computed(() => {
  const money = props.item.currency === 'shlagidiamond'
    ? game.shlagidiamond
    : game.shlagidolar
  return Math.max(1, Math.floor(money / props.item.price))
})

watch(qty, (v) => {
  if (v < 1)
    qty.value = 1
  else if (v > maxQty.value)
    qty.value = maxQty.value
})

function adjustQty(v: number) {
  qty.value += v
}

function setMax() {
  qty.value = maxQty.value
}

function canBuy(amount: number) {
  const cost = props.item.price * amount
  if (props.item.currency === 'shlagidiamond')
    return game.shlagidiamond >= cost
  return game.shlagidolar >= cost
}

function buy() {
  if (inventory.buy(props.item.id, qty.value))
    emit('close')
}

const details = computed(() => props.item.details || props.item.description)
</script>

<template>
  <div class="h-full flex flex-col gap-2">
    <div class="flex items-center gap-2">
      <div
        v-if="props.item.icon"
        class="h-10 w-10"
        :class="[props.item.iconClass, props.item.icon]"
      />
      <img v-else-if="props.item.image" :src="props.item.image" :alt="props.item.name" class="h-10 w-10 object-contain">
      <h3 class="text-lg font-bold">
        {{ props.item.name }}
      </h3>
    </div>
    <div class="flex items-center gap-1">
      Prix Unitaire <UiCurrencyAmount :amount="props.item.price" :currency="props.item.currency ?? 'shlagidolar'" />
    </div>
    <p class="text-sm">
      {{ details }}
    </p>
    <div class="mt-2 flex flex-wrap items-center gap-2">
      <div v-for="i in 3" :key="i" class="flex flex-col gap-1">
        <UiButton :disabled="qty >= maxQty" class="text-sm" type="primary" @click="adjustQty(1 * 10 ** i)">
          + {{ (1 * 10 ** i).toLocaleString() }}
        </UiButton>
        <UiButton :disabled="qty <= 1" type="danger" class="text-xs" @click="adjustQty(-1 * 10 ** i)">
          - {{ (1 * 10 ** i).toLocaleString() }}
        </UiButton>
      </div>
      <UiButton :disabled="qty >= maxQty" @click="setMax">
        MAX
      </UiButton>
      <div class="w-20">
        <NumberInput v-model="qty" class="h-fu" :min="1" :max="maxQty" />
      </div>
    </div>
    <div class="mt-2 flex gap-2">
      <UiButton type="primary" :disabled="!canBuy(qty)" class="flex flex-1 items-center gap-2" @click="buy">
        Acheter <UiCurrencyAmount :amount="props.item.price * qty" :currency="props.item.currency ?? 'shlagidolar'" />
      </UiButton>
      <UiButton class="text-xs" variant="outline" type="danger" @click="emit('close')">
        Retour
      </UiButton>
    </div>
  </div>
</template>
