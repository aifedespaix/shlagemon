<script setup lang="ts">
import type { Item } from '~/type/item'
import { computed, ref } from 'vue'
import Button from '~/components/ui/Button.vue'
import CurrencyAmount from '~/components/ui/CurrencyAmount.vue'
import NumberInput from '~/components/ui/NumberInput.vue'
import { useGameStore } from '~/stores/game'
import { useInventoryStore } from '~/stores/inventory'

const props = defineProps<{ item: Item }>()
const emit = defineEmits<{ (e: 'close'): void }>()

const game = useGameStore()
const inventory = useInventoryStore()
const qty = ref(1)

function setQty(v: number) {
  qty.value = v
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
    <p class="text-sm">
      {{ details }}
    </p>
    <div class="mt-2 flex flex-wrap items-center gap-2">
      <Button :disabled="!canBuy(1)" @click="setQty(1)">
        x1
      </Button>
      <Button :disabled="!canBuy(10)" @click="setQty(10)">
        x10
      </Button>
      <Button :disabled="!canBuy(100)" @click="setQty(100)">
        x100
      </Button>
      <NumberInput v-model="qty" class="w-16" :min="1" />
    </div>
    <div class="mt-2 flex justify-center">
      <CurrencyAmount :amount="props.item.price * qty" :currency="props.item.currency ?? 'shlagidolar'" />
    </div>
    <div class="mt-auto flex justify-end">
      <Button type="primary" :disabled="!canBuy(qty)" @click="buy">
        Acheter
      </Button>
    </div>
  </div>
</template>
