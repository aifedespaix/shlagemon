<script setup lang="ts">
interface Props {
  title: string
  exitText: string
  limitSize?: boolean
  /**
   * Whether to display the footer section and exit button.
   *
   * Defaults to `true`.
   */
  showFooter?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  limitSize: false,
  showFooter: true,
})
const emit = defineEmits(['exit'])
</script>

<template>
  <section class="h-full w-full flex flex-col gap-1 overflow-hidden" :class="[showFooter ? 'p-1' : 'p-0', limitSize ? 'max-w-xl' : '']" v-bind="$attrs">
    <h2 v-if="props.title" class="text-center font-bold">
      {{ props.title }}
    </h2>
    <div class="flex flex-1 flex-col gap-2 overflow-hidden">
      <slot />
    </div>
    <div v-if="showFooter" class="flex flex-wrap justify-end gap-1 bg-white dark:bg-gray-900">
      <slot name="footer">
        <UiButton
          type="danger" variant="outline" class="flex gap-2 text-xs"
          size="xs"
          @click="emit('exit')"
        >
          <div class="i-carbon:exit" />
          {{ props.exitText }}
        </UiButton>
      </slot>
    </div>
  </section>
</template>
