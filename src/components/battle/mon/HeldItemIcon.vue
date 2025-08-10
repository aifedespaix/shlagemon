<script setup lang="ts">
import type { Item } from '~/type/item'

/**
 * Displays an accessible icon for a held item.
 * The parent component must provide the item data.
 */
const props = defineProps<{
  /** Item to display. */
  item: Readonly<Item>
  /** Optional tooltip label. When omitted, the item name is used. */
  tooltip?: string
}>()

const { t } = useI18n()

const tooltip = computed(() => props.tooltip ?? t(props.item.name))
</script>

<template>
  <div
    v-if="props.item.icon"
    v-tooltip="tooltip"
    role="img"
    :aria-label="t(props.item.name)"
    v-bind="$attrs"
    :class="[props.item.icon, props.item.iconClass]"
  />
  <img
    v-else-if="props.item.image"
    v-tooltip="tooltip"
    v-bind="$attrs"
    :src="props.item.image"
    :alt="t(props.item.name)"
    class="object-contain"
  >
</template>
