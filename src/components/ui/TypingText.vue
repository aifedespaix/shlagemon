<script setup lang="ts">
const props = withDefaults(defineProps<{ text: string, speed?: number }>(), {
  speed: 50,
})

const display = ref('')
let timer: ReturnType<typeof setTimeout> | undefined

function start() {
  display.value = ''
  if (timer)
    clearTimeout(timer)
  if (!props.text)
    return
  let i = 0
  function type() {
    display.value += props.text[i++]
    if (i < props.text.length)
      timer = setTimeout(type, props.speed)
  }
  type()
}

watch(() => props.text, start, { immediate: true })

onUnmounted(() => {
  if (timer)
    clearTimeout(timer)
})
</script>

<template>
  <span>{{ display }}</span>
</template>
