<script setup lang="ts">
import type { Item } from '~/type/item'

const props = defineProps<{ item: Item }>()

const { t } = useI18n()
</script>

<template>
  <div class="flex items-center gap-2 border rounded bg-white p-1 dark:bg-gray-900">
    <div
      v-if="props.item.icon"
      class="h-8 w-8"
      :class="[props.item.iconClass, props.item.icon]"
    />
    <img v-else-if="props.item.image" :src="props.item.image" :alt="t(props.item.name)" class="h-8 w-8 object-contain">
    <div class="flex flex-1 flex-col text-left">
      <span class="font-bold">{{ t(props.item.name) }}</span>
      <span class="text-xs">{{ t(props.item.description) }}</span>
    </div>
    <UiCurrencyAmount :amount="props.item.price ?? 0" :currency="props.item.currency ?? 'shlagidolar'" />
  </div>
</template>
