<script setup lang="ts">
import type { Item } from '~/type/item'

const props = defineProps<{ item: Item }>()
const { t } = useI18n()
</script>

<template>
  <div
    v-if="props.item.icon"
    v-bind="$attrs"
    :title="t(props.item.name)"
    :class="[props.item.icon, props.item.iconClass]"
  />
  <img
    v-else-if="props.item.image"
    v-bind="$attrs"
    :title="t(props.item.name)"
    :src="props.item.image"
    :alt="props.item.name"
    class="object-contain"
  >
</template>
