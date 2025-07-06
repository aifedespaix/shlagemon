<script setup lang="ts">
import { computed } from 'vue'
import ShlagediamondIcon from '~/components/icons/shlagediamond.vue'
import ShlagidolarIcon from '~/components/icons/shlagidolar.vue'
import Tooltip from '~/components/ui/Tooltip.vue'

const props = defineProps<{
  amount: number
  currency: 'shlagidolar' | 'shlagidiamond'
}>()

const currencyName = computed(() => {
  const base = props.currency === 'shlagidiamond' ? 'Shlagédiamant' : 'Shlagédollar'
  return props.amount > 1 ? `${base}s` : base
})
const icon = computed(() => props.currency === 'shlagidiamond' ? ShlagediamondIcon : ShlagidolarIcon)
</script>

<template>
  <Tooltip :text="currencyName">
    <span class="inline-flex items-center gap-1">
      <component :is="icon" class="h-4 w-4" />
      <span class="font-bold">{{ amount.toLocaleString() }}</span>
    </span>
  </Tooltip>
</template>
