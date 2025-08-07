<script setup lang="ts">
import type { Item } from '~/type/item'
import { ballHues } from '~/utils/ball'

const props = defineProps<{ item: Item }>()

const { t } = useI18n()

// Visual effect if item is a capture ball
const ballFilter = computed(() =>
  'catchBonus' in props.item ? { filter: `hue-rotate(${ballHues[props.item.id]})` } : {},
)
</script>

<template>
  <UiListItem role="listitem" :aria-label="t(props.item.name)">
    <template #left>
      <div class="h-8 w-8 flex items-center justify-center">
        <div
          v-if="props.item.icon"
          class="h-full w-full" :class="[props.item.iconClass, props.item.icon]"
        />
        <img
          v-else-if="props.item.image"
          :src="props.item.image"
          :alt="t(props.item.name)"
          class="h-full w-full object-contain"
          :style="ballFilter"
        >
      </div>
    </template>

    <div class="min-w-0 flex flex-col text-left">
      <span class="truncate font-bold">{{ t(props.item.name) }}</span>
      <span class="text-xs text-gray-500 dark:text-gray-400">{{ t(props.item.description, props.item.descriptionParams) }}</span>
    </div>

    <template #right>
      <UiCurrencyAmount
        :amount="props.item.price ?? 0"
        :currency="props.item.currency ?? 'shlagidolar'"
        class="whitespace-nowrap font-semibold"
      />
    </template>
  </UiListItem>
</template>
