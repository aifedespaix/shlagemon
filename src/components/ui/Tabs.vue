<script setup lang="ts">
interface Label { text: string, icon?: string }
interface Tab {
  'label': Label
  'component': Component
  'footer'?: Component
  'highlight'?: boolean
  /** Number of new items to display as a badge. */
  'badge'?: number
  /** Marks all tab content as seen when the badge is cleared. */
  'markAllSeen'?: () => void
  'disabled'?: boolean
  'aria-label'?: string
  /** Optional tooltip displayed on hover. */
  'tooltip'?: string
}

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  modelValue?: number
  tabs: readonly Tab[]
  isSmall?: boolean
  iconsOnly?: boolean
}>(), {
  modelValue: 0,
  isSmall: false,
  iconsOnly: false,
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

watch(
  () => props.tabs.map(t => t.disabled),
  () => {
    if (props.tabs[active.value]?.disabled) {
      const idx = props.tabs.findIndex(t => !t.disabled)
      active.value = idx === -1 ? 0 : idx
    }
  },
  { immediate: true },
)

const container = ref<HTMLElement>()
const direction = ref<'left' | 'right'>('left')

const currentFooter = computed<Component | undefined>(() => props.tabs[active.value]?.footer)

/**
 * Clears the badge of a tab without selecting it.
 * Triggered on right click to mark all tab content as seen.
 */
function onContextMenu(tab: Tab) {
  if (tab.badge && tab.badge > 0)
    tab.markAllSeen?.()
}

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
useSwipe(container, {
  threshold: 40,
  onSwipeEnd(_, dir) {
    if (dir === 'left')
      next()
    else if (dir === 'right')
      prev()
  },
})

const tabBtnBase = computed(() =>
  [
    'relative inline-flex items-center justify-center transition-all select-none',
    'outline-none focus-visible:ring-2 focus-visible:ring-sky-500',
    props.isSmall ? 'text-sm py-1' : 'text-base py-2',
    'border-b-2 border-transparent cursor-pointer group',
    'px-3 whitespace-nowrap',
    'bg-transparent',
  ].join(' '),
)

function tabBtnActive(i: number) {
  return [
    active.value === i
      ? 'font-bold border-sky-600 dark:border-sky-400 bg-sky-50 dark:bg-sky-900/60 text-sky-700 dark:text-sky-100 shadow-inner'
      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200',
    props.tabs[i].highlight && active.value !== i ? 'animate-pulse-alt animate-count-infinite' : '',
    props.tabs[i].disabled ? 'opacity-40 pointer-events-none' : '',
  ].join(' ')
}

const transitionName = computed(() => direction.value === 'left' ? 'slide-left' : 'slide-right')
</script>

<template>
  <div class="h-full flex flex-col" v-bind="$attrs">
    <!-- Nav Tabs -->
    <nav
      class="no-scrollbar flex whitespace-nowrap border-b border-gray-200 dark:border-gray-800"
      aria-label="Navigation par onglets"
      :tabindex="0"
      style="scrollbar-width: none;"
      @keydown.left.prevent="prev"
      @keydown.right.prevent="next"
    >
      <template v-for="(tab, i) in props.tabs" :key="i">
        <UiTooltip v-if="tab.tooltip" :text="tab.tooltip" style="flex: 0 0 auto;">
          <button
            type="button"
            :tabindex="active === i ? 0 : -1"
            :aria-selected="active === i"
            :aria-label="tab['aria-label'] || tab.label.text"
            :class="[tabBtnBase, tabBtnActive(i)]"
            :disabled="tab.disabled"
            style="flex: 0 0 auto;"
            @click="select(i)"
            @contextmenu.prevent="onContextMenu(tab)"
            @keydown.enter.space.prevent="select(i)"
          >
            <!-- Icone -->
            <div
              v-if="tab.label.icon"
              class="flex shrink-0 items-center justify-center transition-all" :class="[
                props.iconsOnly ? (props.isSmall ? 'text-xl' : 'text-2xl') : 'text-xl',
                tab.label.icon,
              ]"
              aria-hidden="true"
            />
            <!-- Label -->
            <span
              v-if="!props.iconsOnly"
              class="ml-1 transition-all duration-150"
            >
              {{ tab.label.text }}
            </span>
            <UiBadge
              v-if="tab.badge && tab.badge > 0"
              size="xs"
            >
              {{ tab.badge }}
            </UiBadge>
          </button>
        </UiTooltip>
        <button
          v-else
          type="button"
          :tabindex="active === i ? 0 : -1"
          :aria-selected="active === i"
          :aria-label="tab['aria-label'] || tab.label.text"
          :class="[tabBtnBase, tabBtnActive(i)]"
          :disabled="tab.disabled"
          style="flex: 0 0 auto;"
          @click="select(i)"
          @contextmenu.prevent="onContextMenu(tab)"
          @keydown.enter.space.prevent="select(i)"
        >
          <!-- Icone -->
          <div
            v-if="tab.label.icon"
            class="flex shrink-0 items-center justify-center transition-all" :class="[
              props.iconsOnly ? (props.isSmall ? 'text-xl' : 'text-2xl') : 'text-xl',
              tab.label.icon,
            ]"
            aria-hidden="true"
          />
          <!-- Label -->
          <span
            v-if="!props.iconsOnly"
            class="ml-1 transition-all duration-150"
          >
            {{ tab.label.text }}
          </span>
          <UiBadge
            v-if="tab.badge && tab.badge > 0"
            size="xs"
          >
            {{ tab.badge }}
          </UiBadge>
        </button>
      </template>
    </nav>

    <!-- Tab content avec transitions -->
    <section
      ref="container"
      class="relative min-h-0 flex-1 overflow-x-hidden overflow-y-auto bg-white dark:bg-gray-900 focus:outline-none"
      :tabindex="-1"
    >
      <Transition :name="transitionName" mode="out-in">
        <component
          :is="props.tabs[active]?.component"
          :key="active"
          class="absolute inset-0"
        />
      </Transition>
    </section>
    <div
      v-if="currentFooter"
      class="shrink-0 border-t border-gray-200 bg-white p-2 dark:border-gray-800 dark:bg-gray-900"
    >
      <component :is="currentFooter" />
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
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
