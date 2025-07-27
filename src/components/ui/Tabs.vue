<script setup lang="ts">
import type { Component } from 'vue'
import { useSwipe } from '@vueuse/core'
import { nextTick, onMounted, ref, watch } from 'vue'

interface Label {
  text: string
  icon?: string
}

interface Tab {
  label: Label
  component: Component
  highlight?: boolean
}

const props = withDefaults(defineProps<{
  modelValue?: number
  tabs: Tab[]
  isSmall?: boolean
}>(), {
  modelValue: 0,
  isSmall: false,
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

const tabButtonClasses = computed(() => {
  const unoCss = []
  if (props.isSmall) {
    unoCss.push('text-sm', 'py-1')
  }
  else {
    unoCss.push('text-base', 'py-2')
  }
  return unoCss.join(' ')
})

function tabButtonActiveClasses(actual: number) {
  const unoCss = []
  if (active.value === actual) {
    unoCss.push('font-bold', 'border-b-2', 'border-blue-600', 'dark:border-blue-400')
  }
  else {
    unoCss.push('hover:bg-gray-100', 'dark:hover:bg-gray-800')
  }
  return unoCss.join(' ')
}

const tabBarRef = ref<HTMLElement | null>(null)
const showOnlyIcons = ref(false)

function checkTabsOverflow() {
  const bar = tabBarRef.value
  if (!bar)
    return
  // Si le contenu déborde horizontalement, on affiche seulement les icônes
  showOnlyIcons.value = bar.scrollWidth > bar.clientWidth
}

onMounted(() => {
  nextTick(() => {
    checkTabsOverflow()
    // Observe dynamiquement la taille de la barre
    if (window.ResizeObserver) {
      const observer = new ResizeObserver(checkTabsOverflow)
      if (tabBarRef.value)
        observer.observe(tabBarRef.value)
    }
    window.addEventListener('resize', checkTabsOverflow)
  })
})
watch(() => props.tabs, () => nextTick(checkTabsOverflow))
</script>

<template>
  <div class="h-full flex flex-col">
    <div
      ref="tabBarRef" class="flex border-b border-gray-200"
      dark="border-gray-800"
    >
      <button
        v-for="(tab, i) in props.tabs"
        :key="i"
        class="min-w-0 flex flex-1 items-center gap-1 px-1 text-center"
        :class="[
          `${tabButtonActiveClasses(i)} ${tabButtonClasses}`,
          tab.highlight && active !== i ? 'animate-pulse-alt animate-count-infinite' : '',
        ]"
        @click="select(i)"
      >
        <!-- Si pas assez de place et icône dispo, on montre QUE l'icône -->
        <template v-if="showOnlyIcons && tab.label.icon">
          <div :class="tab.label.icon" />
        </template>
        <!-- Sinon, on montre l'icône puis le texte (tronqué si besoin) -->
        <template v-else>
          <div v-if="tab.label.icon" :class="tab.label.icon" />
          <span
            v-if="!showOnlyIcons || !tab.label.icon"
            class="block truncate"
            style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden; min-width: 0;"
          >
            {{ tab.label.text }}
          </span>
        </template>
      </button>
    </div>
    <div ref="container" class="tiny-scrollbar relative flex-1 overflow-x-hidden overflow-y-auto">
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
    transform 0.15s ease,
    opacity 0.15s ease;
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
