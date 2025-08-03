<script setup lang="ts">
const contentRef = ref<HTMLDivElement | null>(null)
const prefersReducedMotion = usePreferredReducedMotion()

/**
 * Scrolls the panel content to the top.
 * Respects the user's reduced motion preference.
 */
function scrollToTop(): void {
  const behavior: ScrollBehavior = prefersReducedMotion.value ? 'auto' : 'smooth'
  contentRef.value?.scrollTo({ top: 0, behavior })
}

defineExpose({ scrollToTop })
</script>

<template>
  <section class="h-full w-full flex flex-col gap-2 overflow-hidden">
    <div class="flex flex-wrap gap-2 px-1">
      <slot name="header" />
    </div>
    <div
      ref="contentRef"
      class="tiny-scrollbar flex flex-col gap-1 overflow-x-hidden overflow-y-auto p-1"
    >
      <slot name="content" />
    </div>
  </section>
</template>
