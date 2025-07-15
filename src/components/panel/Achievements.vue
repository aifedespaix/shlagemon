<script setup lang="ts">
import { useAchievementsStore } from '~/stores/achievements'
import { useAchievementsFilterStore } from '~/stores/achievementsFilter'

const openedId = ref<string | null>(null)

const store = useAchievementsStore()
const filter = useAchievementsFilterStore()

const statusOptions = [
  { label: 'Tous', value: 'all' },
  { label: 'Débloqués', value: 'unlocked' },
  { label: 'À débloquer', value: 'locked' },
]

const list = computed(() => {
  if (filter.status === 'all')
    return store.list
  if (filter.status === 'unlocked')
    return store.unlockedList
  return store.list.filter(a => !a.achieved)
})
const filteredList = computed(() => {
  if (!filter.search.trim())
    return list.value
  const q = filter.search.toLowerCase()
  return list.value.filter(a => a.title.toLowerCase().includes(q))
})

function toggleItem(id: string) {
  openedId.value = openedId.value === id ? null : id
}
</script>

<template>
  <LayoutScrollablePanel>
    <template #header>
      <UiSelectOption
        v-model="filter.status"
        :options="statusOptions"
      />
      <UiSearchInput v-model="filter.search" class="flex-1" />
    </template>

    <template #content>
      <AchievementItem
        v-for="a in filteredList"
        :key="a.id"
        :achievement="a"
        :opened="openedId === a.id"
        @toggle="toggleItem(a.id)"
      />
    </template>
  </LayoutScrollablePanel>
</template>
