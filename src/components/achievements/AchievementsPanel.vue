<script setup lang="ts">
import SearchInput from '~/components/ui/SearchInput.vue'
import SelectOption from '~/components/ui/SelectOption.vue'
import { useAchievementsStore } from '~/stores/achievements'
import { useAchievementsFilterStore } from '~/stores/achievementsFilter'
import AchievementItem from './AchievementItem.vue'

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
</script>

<template>
  <ScrollablePanel>
    <template #header>
      <SelectOption
        v-model="filter.status"
        :options="statusOptions"
        class="min-w-28"
      />
      <SearchInput v-model="filter.search" class="flex-1" />
    </template>

    <template #content>
      <AchievementItem
        v-for="a in filteredList"
        :key="a.id"
        :achievement="a"
      />
    </template>
  </ScrollablePanel>
</template>
