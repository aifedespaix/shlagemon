<script setup lang="ts">
interface Props {
  value: number
  max: number
  color?: string
  flash?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  color: undefined,
  flash: false,
})
</script>

<template>
  <div class="flex flex-col items-end">
    <UiProgressBar
      :value="props.value"
      :max="props.max"
      :color="props.color"
      class="mt-1 w-24"
      :class="{ flash: props.flash }"
    />
    <div class="w-full text-right text-sm">
      <UiAnimatedNumber :value="props.value" /> / {{ props.max.toLocaleString() }}
    </div>
  </div>
</template>
