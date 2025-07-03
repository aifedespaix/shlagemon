<script setup lang="ts">
import Button from '~/components/ui/Button.vue'
import { useAchievementsStore } from '~/stores/achievements'
import AchievementItem from './AchievementItem.vue'

const store = useAchievementsStore()
const showLocked = ref(false)
const list = computed(() => showLocked.value ? store.list : store.unlockedList)
</script>

<template>
  <div class="flex flex-col gap-1">
    <Button class="self-end text-xs" @click="showLocked = !showLocked">
      {{ showLocked ? 'Masquer' : 'Afficher' }} les succès verrouillés
    </Button>
    <AchievementItem
      v-for="a in list"
      :key="a.id"
      :achievement="a"
    />
  </div>
</template>
