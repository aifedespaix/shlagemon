<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, useAttrs } from 'vue'

/** Label pour chaque onglet */
interface Label {
  text: string
  icon?: string
}

/** Définition forte des tabs */
interface Tab {
  label: Label
  component: any // Remplace par DefineComponent si tu veux du typage ultra strict
  highlight?: boolean
  disabled?: boolean
  'aria-label'?: string
}

const props = withDefaults(defineProps<{
  modelValue?: number
  tabs: readonly Tab[]
  isSmall?: boolean
}>(), {
  modelValue: 0,
  isSmall: false,
})

// Fix warning Vue: on gère nous-même les attrs
defineOptions({ inheritAttrs: false })
const $attrs = useAttrs()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}>()

const active = ref(props.modelValue)
watch(() => props.modelValue, v => active.value = v)
watch(active, v => {
  emit('update:modelValue', v)
  emit('change', v)
})

const container = ref<HTMLElement>()
const direction = ref<'left' | 'right'>('left')

function select(i: number) {
  if (i === active.value || props.tabs[i]?.disabled) return
  direction.value = i > active.value ? 'left' : 'right'
  active.value = i
}
function next() {
  for (let i = active.value + 1; i < props.tabs.length; i++)
    if (!props.tabs[i].disabled) return select(i)
}
function prev() {
  for (let i = active.value - 1; i >= 0; i--)
    if (!props.tabs[i].disabled) return select(i)
}

// Swipe mobile
useSwipe(container, {
  threshold: 40,
  onSwipeEnd(_, dir) {
    if (dir === 'left') next()
    else if (dir === 'right') prev()
  },
})

// Responsive/overflow : scroll horizontale auto des tabs sur mobile
const tabBarRef = ref<HTMLElement>()
const showOnlyIcons = ref(false)

function checkTabsOverflow() {
  const bar = tabBarRef.value
  if (!bar) return
  showOnlyIcons.value = bar.scrollWidth > bar.clientWidth + 2
}
onMounted(() => {
  nextTick(() => {
    checkTabsOverflow()
    if (window.ResizeObserver) {
      const obs = new ResizeObserver(checkTabsOverflow)
      tabBarRef.value && obs.observe(tabBarRef.value)
    }
    window.addEventListener('resize', checkTabsOverflow)
  })
})

watch(() => props.tabs, () => nextTick(checkTabsOverflow))

const tabBtnBase = computed(() =>
  [
    'relative', 'flex', 'flex-1', 'justify-center', 'items-center',
    'gap-1', 'px-2', 'min-w-0', 'transition-all', 'select-none',
    'outline-none', 'focus-visible:z-10', 'focus-visible:ring-2', 'focus-visible:ring-sky-500',
    props.isSmall ? 'text-sm py-1' : 'text-base py-2',
    'border-b-2 border-transparent',
    'cursor-pointer',
  ].join(' ')
)

function tabBtnActive(i: number) {
  return [
    active.value === i
      ? 'font-bold border-sky-600 dark:border-sky-400 bg-sky-50 dark:bg-sky-900/60 text-sky-700 dark:text-sky-100 shadow-inner'
      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200',
    props.tabs[i].highlight && active.value !== i
      ? 'animate-pulse-alt animate-count-infinite'
      : '',
    props.tabs[i].disabled
      ? 'opacity-40 pointer-events-none'
      : ''
  ].join(' ')
}

const transitionName = computed(() => direction.value === 'left' ? 'slide-left' : 'slide-right')
</script>

<template>
  <div
    class="h-full flex flex-col"
    v-bind="$attrs"
  >
    <nav
      ref="tabBarRef"
      class="flex border-b border-gray-200 dark:border-gray-800 overflow-x-auto no-scrollbar"
      aria-label="Navigation par onglets"
      tabindex="0"
      @keydown.left.prevent="prev"
      @keydown.right.prevent="next"
    >
      <button
        v-for="(tab, i) in props.tabs"
        :key="i"
        type="button"
        :tabindex="active === i ? 0 : -1"
        :aria-selected="active === i"
        :aria-label="tab['aria-label'] || tab.label.text"
        class="group w-full"
        :class="[tabBtnBase, tabBtnActive(i)]"
        @click="select(i)"
        @keydown.enter.space.prevent="select(i)"
        :disabled="tab.disabled"
      >
        <div v-if="tab.label.icon" :class="['shrink-0 text-xl', tab.label.icon]" aria-hidden="true" />
        <span
          v-if="!showOnlyIcons || !tab.label.icon"
          class="block truncate min-w-0 max-w-full text-ellipsis"
        >
          {{ tab.label.text }}
        </span>
      </button>
    </nav>

    <section
      ref="container"
      class="relative flex-1 overflow-x-hidden overflow-y-auto min-h-0 bg-white dark:bg-gray-900 focus:outline-none"
      tabindex="-1"
    >
      <Transition :name="transitionName" mode="out-in">
        <component
          :is="props.tabs[active]?.component"
          :key="active"
          class="absolute inset-0"
        />
      </Transition>
    </section>
  </div>
</template>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition:
    transform 0.18s cubic-bezier(.33,1.02,.57,1.01),
    opacity 0.18s cubic-bezier(.33,1.02,.57,1.01);
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
