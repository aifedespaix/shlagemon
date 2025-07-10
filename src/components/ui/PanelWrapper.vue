<script setup lang="ts">
import { useMediaQuery } from '@vueuse/core'

const props = defineProps<{ title?: string, isInline?: boolean, isScrollable?: boolean, isMobileHidable?: boolean }>()
const opened = ref(true)
const isMobile = useMediaQuery('(max-width: 767px)')

const hidable = computed(() => !isMobile.value || props.isMobileHidable)

function toggle() {
  if (!hidable.value)
    return
  if (props.title)
    opened.value = !opened.value
}

function beforeEnter(el: Element) {
  const element = el as HTMLElement
  element.style.height = '0'
}

function enter(el: Element) {
  const element = el as HTMLElement
  element.style.height = `${element.scrollHeight}px`
}

function afterEnter(el: Element) {
  const element = el as HTMLElement
  element.style.height = 'auto'
}

function beforeLeave(el: Element) {
  const element = el as HTMLElement
  element.style.height = `${element.scrollHeight}px`
}

function leave(el: Element) {
  const element = el as HTMLElement
  void element.offsetHeight
  element.style.height = '0'
}

function afterLeave(el: Element) {
  const element = el as HTMLElement
  element.style.height = 'auto'
}

const wrapperClasses = computed(() => {
  const unocss: string[] = []
  if (!props.isInline && opened.value)
    unocss.push('flex-1')
  return unocss.join(' ')
})

const contentClasses = computed(() => {
  const unocss: string[] = []
  if (props.isInline)
    unocss.push('flex', 'items-center', 'justify-center')
  if (props.isScrollable) {
    unocss.push('overflow-auto tiny-scrollbar')
  }
  else if (!props.isInline) {
    unocss.push('overflow-hidden')
  }

  return unocss.join(' ')
})

const titleClasses = computed(() => {
  const classes = []
  if (!isMobile.value)
    classes.push('cursor-pointer')

  return classes.join(' ')
})
</script>

<template>
  <div class="panel-wrapper" v-bind="$attrs" :class="wrapperClasses">
    <div v-if="props.title" class="mb-1 flex items-center justify-between p-2" :class="titleClasses" @click="toggle">
      <div class="flex items-center gap-1">
        <slot name="icon" />
        <span class="font-bold">{{ props.title }}</span>
      </div>
      <div v-if="hidable" class="i-carbon-chevron-down transition-transform" :class="opened ? '' : 'rotate-90'" />
    </div>
    <Transition
      name="collapse"
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div v-show="opened" class="flex flex-1 flex-col" :class="contentClasses">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.panel-wrapper {
  @apply flex flex-col;
  @apply rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800;
}

.collapse-enter-active,
.collapse-leave-active {
  /* transition: height 0.2s ease;*/
}
</style>
