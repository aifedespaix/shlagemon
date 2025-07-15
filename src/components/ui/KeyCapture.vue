<script setup lang="ts">
import { useKeyboardCaptureStore } from '~/stores/keyboardCapture'

const props = withDefaults(defineProps<{ modelValue: string, size?: 'sm' | 'md' | 'lg' | 'xl' }>(), {
  size: 'md',
})
const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()

const captureStore = useKeyboardCaptureStore()
const waiting = ref(false)

function startCapture() {
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
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
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
