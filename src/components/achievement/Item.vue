<script setup lang="ts">
const props = withDefaults(defineProps<{ achievement: Achievement & { achieved: boolean }, opened?: boolean }>(), {
  opened: false,
})
const emit = defineEmits(['toggle'])

const store = useAchievementsStore()
const progress = computed(() => store.getProgress(props.achievement.id))

function toggle() {
  emit('toggle')
}
</script>

<template>
  <UiListItem
    :color="props.achievement.achieved ? 'success' : 'locked'"
    @click="toggle"
    role="button"
    :aria-label="props.achievement.title"
  >
    <template #left>
      <div :class="props.achievement.icon" class="inline-block text-lg" />
    </template>

    <div class="flex items-center justify-between min-w-0 w-full cursor-pointer">
      <span class="font-bold truncate flex-1">{{ props.achievement.title }}</span>
      <div class="i-carbon-chevron-down transition-transform ml-2" :class="props.opened ? '' : 'rotate-90'" />
    </div>

    <div v-show="props.opened" class="mt-1 text-xs w-full">
      <p>{{ props.achievement.description }}</p>
      <div v-if="!props.achievement.achieved && progress" class="mt-1">
        <div class="mb-1 text-center">
          {{ progress.value.toLocaleString() }} / {{ progress.max.toLocaleString() }}
        </div>
        <UiProgressBar :value="progress.value" :max="progress.max" class="h-1" />
      </div>
    </div>
  </UiListItem>
</template>
