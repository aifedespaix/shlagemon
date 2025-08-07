<script setup lang="ts">
import type { Item } from '~/type/item'

const props = defineProps<{ item: Item }>()
const { t } = useI18n()
</script>

<template>
  <div
    v-if="props.item.icon"
    v-tooltip="t(props.item.name)"
    v-bind="$attrs"
    :class="[props.item.icon, props.item.iconClass]"
  />
  <img
    v-else-if="props.item.image"
    v-tooltip="t(props.item.name)"
    v-bind="$attrs"
    :src="props.item.image"
    :alt="t(props.item.name)"
    class="object-contain"
  >
</template>
