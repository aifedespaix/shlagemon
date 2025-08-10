<script setup lang="ts">
interface Props { label: string }

const props = defineProps<Props>()

const emit = defineEmits<{ (e: 'openInfo'): void }>()
</script>

<template>
  <UiButton
    v-tooltip="props.label"
    type="icon"
    size="xs"
    :aria-label="props.label"
    @click.stop="emit('openInfo')"
  >
    <div i-carbon-information />
  </UiButton>
</template>
