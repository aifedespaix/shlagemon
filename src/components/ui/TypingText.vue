<script setup lang="ts">
const props = withDefaults(defineProps<{ text: string, speed?: number }>(), {
  speed: 20,
})

const emit = defineEmits<{
  (e: 'finished'): void
}>()

const audio = useAudioStore()

const display = ref('')
let timer: ReturnType<typeof useTimeoutFn> | undefined

function start() {
  display.value = ''
  timer?.stop()
  if (!props.text)
    return emit('finished')
  let i = 0
  function typeChar() {
    display.value += props.text[i++]
    audio.playTypingSfx()
    if (i < props.text.length)
      timer = useTimeoutFn(typeChar, props.speed)
    else
      emit('finished')
  }
  typeChar()
}

watch(() => props.text, start, { immediate: true })

onUnmounted(() => {
  timer?.stop()
})
</script>

<template>
  <span>{{ display }}</span>
</template>
