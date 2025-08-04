<script setup lang="ts">
import type { Item } from '~/type/item'

const props = defineProps<{ item: Item }>()
const { t } = useI18n()
</script>

<template>
  <UiTooltip :text="t(props.item.name)">
    <div
      v-if="props.item.icon"
      v-bind="$attrs"
      :class="[props.item.icon, props.item.iconClass]"
    />
    <img
      v-else-if="props.item.image"
      v-bind="$attrs"
      :src="props.item.image"
      :alt="props.item.name"
      class="object-contain"
    >
  </UiTooltip>
</template>
