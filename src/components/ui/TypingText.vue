<script setup lang="ts">
const props = withDefaults(defineProps<{ text: string, speed?: number }>(), {
  speed: 15,
})

const emit = defineEmits<{
  (e: 'finished'): void
}>()

const audio = useAudioStore()

const display = ref('')
let timer: ReturnType<typeof setTimeout> | undefined

function clearTimer() {
  if (timer !== undefined) {
    clearTimeout(timer)
    timer = undefined
  }
}

function start() {
  display.value = ''
  clearTimer()
  if (!props.text)
    return emit('finished')
  let index = 0
  function typeChar() {
    display.value += props.text[index++]
    audio.playTypingSfx()
    if (index < props.text.length)
      timer = setTimeout(typeChar, props.speed)
    else
      emit('finished')
  }
  typeChar()
}

watch(() => props.text, start, { immediate: true })

onUnmounted(clearTimer)
</script>

<template>
  <span>{{ display }}</span>
</template>
