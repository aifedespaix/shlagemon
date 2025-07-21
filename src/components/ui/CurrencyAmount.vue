<script setup lang="ts">
import IconShlagidiamond from '~/components/icon/Shlagidiamond.vue'
import IconShlagidolar from '~/components/icon/Shlagidolar.vue'

const props = defineProps<{
  amount: number
  currency: 'shlagidolar' | 'shlagidiamond'
}>()

const currencyName = computed(() => {
  const base = props.currency === 'shlagidiamond' ? 'Shlagédiamant' : 'Shlagédollar'
  return props.amount > 1 ? `${base}s` : base
})
const icon = computed(() => props.currency === 'shlagidiamond' ? IconShlagidiamond : IconShlagidolar,
)
</script>

<template>
  <UiTooltip :text="currencyName">
    <span class="inline-flex items-center gap-1">
      <component :is="icon" class="h-4 w-4" />
      <span class="font-bold">{{ amount.toLocaleString() }}</span>
    </span>
  </UiTooltip>
</template>
