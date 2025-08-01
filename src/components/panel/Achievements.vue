<script setup lang="ts">
const openedId = ref<string | null>(null)

const store = useAchievementsStore()
const filter = useAchievementsFilterStore()

const { t } = useI18n()
const statusOptions = [
  { label: t('components.panel.Achievements.all'), value: 'all' },
  { label: t('components.panel.Achievements.unlocked'), value: 'unlocked' },
  { label: t('components.panel.Achievements.locked'), value: 'locked' },
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

onMounted(() => store.markAllSeen())
watch(() => store.unlockedList.length, store.markAllSeen)

function toggleItem(id: string) {
  openedId.value = openedId.value === id ? null : id
}
</script>

<template>
  <LayoutScrollablePanel>
    <template #header>
      <div class="w-full flex flex-wrap gap-1 p-1">
        <div class="min-w-24 flex-1">
          <UiSelectOption
            v-model="filter.status"
            :options="statusOptions"
          />
        </div>
        <UiSearchInput v-model="filter.search" class="min-w-22 flex-1" />
      </div>
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
