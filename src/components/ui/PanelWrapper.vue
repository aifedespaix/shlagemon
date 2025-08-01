<script setup lang="ts">
import type { BadgeColor } from '~/type/badge'
import { storeToRefs } from 'pinia'

const props = defineProps<{ title?: string, isInline?: boolean, isScrollable?: boolean, isMobileHidable?: boolean, isLocked?: boolean, badge?: number, badgeColor?: BadgeColor, badgeClick?: () => void }>()
const opened = ref(true)
const { isMobile } = storeToRefs(useUIStore())

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

const showBadge = computed(() => (props.badge ?? 0) > 0)

function onTitleClick(e: MouseEvent) {
  if (showBadge.value && props.badgeClick) {
    e.stopPropagation()
    props.badgeClick()
  }
  toggle()
}

function clickPrevented(e: MouseEvent) {
  if (props.isLocked) {
    e.preventDefault()
    e.stopPropagation()
    return false
  }
}
</script>

<template>
  <div class="panel-wrapper" v-bind="$attrs" :class="wrapperClasses">
    <div v-if="props.title" class="flex items-center justify-between p-2" :class="titleClasses" @click="onTitleClick">
      <div class="flex items-center gap-1">
        <slot name="icon" />
        <span class="relative pr-4 font-bold">{{ props.title }}
          <UiBadge
            v-if="showBadge"
            :color="props.badgeColor || 'info'"
            size="xs"
            class="-right-1 -top-1"
            inner
          >
            {{ props.badge }}
          </UiBadge></span>
      </div>
      <div class="relative flex items-center">
        <div v-if="hidable" class="i-carbon-chevron-down transition-transform" :class="opened ? '' : 'rotate-90'" />
      </div>
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
      <div v-show="opened" class="flex flex-1 flex-col items-center" :class="contentClasses">
        <slot />
      </div>
    </Transition>
    <div v-if="props.isLocked" class="absolute inset-0 z-99999999 bg-black/20 dark:bg-black/40" @click="clickPrevented" />
  </div>
</template>

<style scoped>
.panel-wrapper {
  @apply relative flex flex-col rounded bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800;
}
</style>
