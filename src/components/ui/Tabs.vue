<script setup lang="ts">
import type { Component } from 'vue'
import { useSwipe } from '@vueuse/core'

const props = withDefaults(defineProps<{
  modelValue?: number
  tabs: { label: string, component: Component }[]
}>(), {
  modelValue: 0,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const active = ref(props.modelValue)

watch(() => props.modelValue, (val) => {
  if (val !== undefined)
    active.value = val
})
watch(active, value => emit('update:modelValue', value))

const container = ref<HTMLElement>()
const direction = ref<'left' | 'right'>('left')

function select(i: number) {
  if (i === active.value)
    return
  direction.value = i > active.value ? 'left' : 'right'
  active.value = i
}

function next() {
  if (active.value < props.tabs.length - 1)
    select(active.value + 1)
}
function prev() {
  if (active.value > 0)
    select(active.value - 1)
}

useSwipe(container, {
  threshold: 50,
  onSwipeEnd(_, dir) {
    if (dir === 'left')
      next()
    else if (dir === 'right')
      prev()
  },
})

const transitionName = computed(() => direction.value === 'left' ? 'slide-left' : 'slide-right')
</script>

<template>
  <div class="h-full flex flex-col">
    <div class="flex border-b border-gray-200" dark="border-gray-800">
      <button
        v-for="(tab, i) in props.tabs"
        :key="i"
        class="flex-1 py-2 text-center"
        :class="active === i ? 'font-bold border-b-2 border-blue-600 dark:border-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-800'"
        @click="select(i)"
      >
        {{ tab.label }}
      </button>
    </div>
    <div ref="container" class="relative flex-1 overflow-hidden">
      <Transition :name="transitionName" mode="out-in">
        <component :is="props.tabs[active].component" :key="active" class="absolute inset-0" />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.slide-left-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
.slide-left-leave-to,
.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-left-enter-to,
.slide-left-leave-from,
.slide-right-enter-to,
.slide-right-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
