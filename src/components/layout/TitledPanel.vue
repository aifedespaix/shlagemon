<script setup lang="ts">
const props = defineProps<{ title: string, exitText: string }>()
const emit = defineEmits(['exit'])
</script>

<template>
  <section class="h-full max-w-xl w-full w-full flex flex-col gap-1 overflow-hidden p-1" v-bind="$attrs">
    <h2 class="text-center font-bold">
      {{ props.title }}
    </h2>
    <div class="flex flex-1 flex-col gap-2 overflow-hidden">
      <slot />
    </div>
    <div class="flex flex-wrap justify-end gap-2 bg-white dark:bg-gray-900">
      <slot name="footer">
        <UiButton
          type="danger" variant="outline" class="flex gap-2 text-xs"
          @click="emit('exit')"
        >
          <div class="i-carbon:exit" />
          {{ props.exitText }}
        </UiButton>
      </slot>
    </div>
  </section>
</template>
