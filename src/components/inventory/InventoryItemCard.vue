<script setup lang="ts">
import type { Item } from '~/type/item'
import { computed, ref } from 'vue'
import Modal from '~/components/modal/Modal.vue'
import Button from '~/components/ui/Button.vue'
import { ballHues } from '~/utils/ball'
import { useItemUsageStore } from '~/stores/itemUsage'

const props = defineProps<{ item: Item, qty: number, disabled?: boolean }>()
const emit = defineEmits<{
  (e: 'use'): void
  (e: 'sell'): void
}>()

const showInfo = ref(false)
const opened = ref(false)
const usage = useItemUsageStore()
const isUnused = computed(() => !usage.used[props.item.id])
function toggle() {
  opened.value = !opened.value
}
const details = computed(() => props.item.details || props.item.description)
const ballFilter = computed(() =>
  'catchBonus' in props.item ? { filter: `hue-rotate(${ballHues[props.item.id]})` } : {},
)

const actionLabel = computed(() => {
  if ('catchBonus' in props.item)
    return props.disabled ? 'Équipé' : 'Équiper'
  return 'Utiliser'
})
</script>

<template>
  <div class="relative flex flex-col gap-1 border rounded bg-white p-2 dark:bg-gray-900"
    :class="isUnused ? 'animate-pulse ring-2 ring-blue-500 dark:ring-blue-400' : ''">
    <div class="flex cursor-pointer items-center justify-between gap-2" @click="toggle">
      <div class="flex items-center gap-2">
        <div
          v-if="props.item.icon"
          class="h-8 w-8"
          :class="[props.item.iconClass, props.item.icon]"
        />
        <img
          v-else-if="props.item.image"
          :src="props.item.image"
          :alt="props.item.name"
          class="h-8 w-8 object-contain"
          :style="ballFilter"
        >
        <span class="font-bold">{{ props.item.name }}</span>
      </div>
      <div class="i-carbon-chevron-down transition-transform" :class="opened ? '' : 'rotate-90'" />
    </div>
    <span v-show="opened" class="text-xs">{{ props.item.description }}</span>
    <div class="mt-1 flex items-center justify-end gap-1">
      <span class="font-bold">x{{ props.qty }}</span>
      <Button
        class="flex items-center gap-1 text-xs"
        :disabled="props.disabled"
        @click="emit('use')"
      >
        <div i-carbon-play inline-block />
        {{ actionLabel }}
      </Button>
      <!--
      <Button type="danger" class="text-xs" @click="emit('sell')">
        Vendre
      </Button>
      -->
    </div>
    <button
      class="absolute bottom-1 left-1 h-4 w-4 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-200"
      @click.stop="showInfo = true"
    >
      <div i-carbon-help class="text-xs" />
    </button>
    <Modal v-model="showInfo" footer-close>
      <div class="flex flex-col items-center gap-2">
        <div
          v-if="props.item.icon"
          class="h-16 w-16"
          :class="[props.item.iconClass, props.item.icon]"
        />
        <img
          v-else-if="props.item.image"
          :src="props.item.image"
          :alt="props.item.name"
          class="h-16 w-16 object-contain"
          :style="ballFilter"
        >
        <h3 class="text-lg font-bold">
          {{ props.item.name }}
        </h3>
        <p class="text-center text-sm">
          {{ details }}
        </p>
      </div>
    </Modal>
  </div>
</template>
