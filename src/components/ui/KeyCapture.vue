<script setup lang="ts">
const props = withDefaults(defineProps<{ modelValue: string, size?: 'sm' | 'md' | 'lg' | 'xl', autoStart?: boolean }>(), {
  size: 'md',
  autoStart: false,
})
const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()

const captureStore = useKeyboardCaptureStore()
const waiting = ref(false)

function startCapture() {
  if (waiting.value) {
    stopCapture()
    return
  }
  waiting.value = true
  captureStore.start()
}

function stopCapture() {
  waiting.value = false
  captureStore.stop()
}

function onKeydown(e: KeyboardEvent) {
  if (!waiting.value)
    return
  e.preventDefault()
  stopCapture()
  emit('update:modelValue', e.key)
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  stopCapture()
})
onMounted(() => {
  if (props.autoStart)
    startCapture()
})
watch(() => props.autoStart, (v) => {
  if (v && !waiting.value)
    startCapture()
})
defineExpose({ startCapture, stopCapture })
</script>

<template>
  <UiKbd
    :key-name="waiting ? '?' : props.modelValue || '?'"
    :size="props.size"
    :waiting="waiting"
    clickable
    @click="startCapture"
  />
</template>
