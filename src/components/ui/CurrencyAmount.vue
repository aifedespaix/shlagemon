<script setup lang="ts">
import IconShlagidiamond from '~/components/icon/Shlagidiamond.vue'
import IconShlagidolar from '~/components/icon/Shlagidolar.vue'
import IconShlagpur from '~/components/icon/Shlagpur.vue'
import AnimatedNumber from '~/components/ui/AnimatedNumber.vue'

const props = defineProps<{
  amount: number
  currency: 'shlagidolar' | 'shlagidiamond' | 'shlagpur'
}>()

const { t } = useI18n()
const currencyName = computed(() => {
  const base = t(`components.ui.CurrencyAmount.${props.currency}`)
  if (props.currency === 'shlagpur')
    return base
  return props.amount > 1 ? `${base}s` : base
})
const icon = computed(() => {
  if (props.currency === 'shlagidiamond')
    return IconShlagidiamond
  if (props.currency === 'shlagpur')
    return IconShlagpur
  return IconShlagidolar
})
</script>

<template>
  <span v-tooltip="currencyName" class="inline-flex items-center gap-1">
    <component :is="icon" class="h-4 w-4" />
    <AnimatedNumber class="font-bold" :value="amount" />
  </span>
</template>
