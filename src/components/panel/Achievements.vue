<script setup lang="ts">
const openedId = ref<string | null>(null)

const store = useAchievementsStore()
const filter = useAchievementsFilterStore()

const { t } = useI18n()
const { translate } = useTranslate()
const statusOptions = [
  { label: t('components.panel.Achievements.all'), value: 'all' },
  { label: t('components.panel.Achievements.unlocked'), value: 'unlocked' },
  { label: t('components.panel.Achievements.locked'), value: 'locked' },
]
const sortOptions = [
  { label: t('components.panel.Achievements.sort.name'), value: 'name' },
  { label: t('components.panel.Achievements.sort.date'), value: 'date' },
  { label: t('components.panel.Achievements.sort.progress'), value: 'progress' },
] as const

const list = computed(() => {
  if (filter.status === 'all')
    return store.list
  if (filter.status === 'unlocked')
    return store.unlockedList
  return store.list.filter(a => !a.achieved)
})
const searchedList = computed(() => {
  if (!filter.search.trim())
    return list.value
  const q = filter.search.toLowerCase()
  return list.value.filter((a) => {
    const title = translate(a.title, a.titleParams).toLowerCase()
    return title.includes(q)
  })
})
const sortedList = computed(() => {
  const arr = searchedList.value.slice()
  switch (filter.sortBy) {
    case 'name':
      arr.sort((a, b) =>
        translate(a.title, a.titleParams).localeCompare(translate(b.title, b.titleParams)),
      )
      break
    case 'date':
      arr.sort((a, b) => (a.unlockedAt || 0) - (b.unlockedAt || 0))
      break
    case 'progress':
      arr.sort((a, b) => {
        const pa = store.getProgress(a.id)
        const pb = store.getProgress(b.id)
        const va = pa ? pa.value / pa.max : 0
        const vb = pb ? pb.value / pb.max : 0
        return va - vb
      })
      break
  }
  if (!filter.sortAsc)
    arr.reverse()
  return arr
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
        <UiSortControls
          v-model:sort-by="filter.sortBy"
          v-model:sort-asc="filter.sortAsc"
          :options="sortOptions"
        />
        <UiSearchInput v-model="filter.search" class="min-w-22 flex-1" />
      </div>
    </template>

    <template #content>
      <AchievementItem
        v-for="a in sortedList"
        :key="a.id"
        :achievement="a"
        :opened="openedId === a.id"
        @toggle="toggleItem(a.id)"
      />
    </template>
  </LayoutScrollablePanel>
</template>
