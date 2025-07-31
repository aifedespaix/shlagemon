<script setup lang="ts">
import { useSwipe } from '@vueuse/core'
import { computed, defineEmits, defineProps, nextTick, onMounted, ref, useAttrs, watch } from 'vue'

/** Label pour chaque onglet */
interface Label {
  text: string
  icon?: string // class ou name
}
/** Définition forte des tabs */
interface Tab {
  'label': Label
  'component': any // Met DefineComponent pour un typage encore plus strict si besoin
  'highlight'?: boolean
  'disabled'?: boolean
  'aria-label'?: string
}

// Fix warning Vue: on gère nous-même les attrs
defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  modelValue?: number
  tabs: readonly Tab[]
  isSmall?: boolean
}>(), {
  modelValue: 0,
  isSmall: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
  (e: 'change', value: number): void
}>()

const $attrs = useAttrs()

const active = ref(props.modelValue)
watch(() => props.modelValue, v => active.value = v)
watch(active, (v) => {
  emit('update:modelValue', v)
  emit('change', v)
})

const container = ref<HTMLElement>()
const direction = ref<'left' | 'right'>('left')

function select(i: number) {
  if (i === active.value || props.tabs[i]?.disabled)
    return
  direction.value = i > active.value ? 'left' : 'right'
  active.value = i
}
function next() {
  for (let i = active.value + 1; i < props.tabs.length; i++) {
    if (!props.tabs[i].disabled)
      return select(i)
  }
}
function prev() {
  for (let i = active.value - 1; i >= 0; i--) {
    if (!props.tabs[i].disabled)
      return select(i)
  }
}

// Swipe mobile (facultatif mais tellement UX++ sur mobile)
useSwipe(container, {
  threshold: 40,
  onSwipeEnd(_, dir) {
    if (dir === 'left')
      next()
    else if (dir === 'right')
      prev()
  },
})

// Gestion du mode "icônes only" si texte ellipsé
const tabBarRef = ref<HTMLElement>()
const labelRefs = ref<(HTMLElement | null)[]>([])
const showOnlyIcons = ref(false)

/** True si un des labels est ellipsé */
function isEllipsisActive(el: HTMLElement): boolean {
  return el.scrollWidth > el.clientWidth + 1 // +1 = marge anti-bug pixel
}
function checkLabelsOverflow() {
  nextTick(() => {
    // on teste tous les labels : si un seul ellipsé, icônes only !
    const anyEllipsed = labelRefs.value.some(el => el && isEllipsisActive(el))
    showOnlyIcons.value = anyEllipsed
  })
}
onMounted(() => {
  nextTick(() => {
    checkLabelsOverflow()
    if (window.ResizeObserver) {
      const obs = new ResizeObserver(checkLabelsOverflow)
      tabBarRef.value && obs.observe(tabBarRef.value)
    }
    window.addEventListener('resize', checkLabelsOverflow)
  })
})
watch(() => props.tabs, () => nextTick(checkLabelsOverflow))

// Base classes boutons tabs
const tabBtnBase = computed(() =>
  [
    'relative flex flex-1 justify-center items-center gap-1 min-w-0 transition-all select-none',
    'outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-sky-500',
    props.isSmall ? 'text-sm py-1' : 'text-base py-2',
    'border-b-2 border-transparent cursor-pointer',
    'overflow-hidden', // important pour clamp
    'group',
  ].join(' '),
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
      : '',
  ].join(' ')
}

// Slide direction
const transitionName = computed(() => direction.value === 'left' ? 'slide-left' : 'slide-right')
</script>

<template>
  <div class="h-full flex flex-col" v-bind="$attrs">
    <!-- Nav Tabs -->
    <nav
      ref="tabBarRef"
      class="no-scrollbar flex overflow-x-auto border-b border-gray-200 dark:border-gray-800"
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
        :class="[tabBtnBase, tabBtnActive(i)]"
        :disabled="tab.disabled"
        style="min-width: 0;"
        @click="select(i)"
        @keydown.enter.space.prevent="select(i)"
      >
        <div
          v-if="tab.label.icon"
          class="shrink-0 transition-all" :class="[
            showOnlyIcons ? (props.isSmall ? 'text-xl' : 'text-2xl') : 'text-xl',
            tab.label.icon,
          ]"
          aria-hidden="true"
        />
        <!-- Le span label n'est jamais affiché si on est en mode icônes only -->
        <span
          v-if="!showOnlyIcons || !tab.label.icon"
          :ref="el => labelRefs[i] = el"
          class="block max-w-full min-w-0 truncate text-ellipsis transition-all duration-150"
        >
          {{ tab.label.text }}
        </span>
      </button>
    </nav>

    <!-- Tab content (slot dynamiques avec transitions) -->
    <section
      ref="container"
      class="relative min-h-0 flex-1 overflow-x-hidden overflow-y-auto bg-white dark:bg-gray-900 focus:outline-none"
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
    transform 0.18s cubic-bezier(0.33, 1.02, 0.57, 1.01),
    opacity 0.18s cubic-bezier(0.33, 1.02, 0.57, 1.01);
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
