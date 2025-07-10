<script setup lang="ts">
import Button from '~/components/ui/Button.vue'
import CheckBox from '~/components/ui/CheckBox.vue'
import SearchInput from '~/components/ui/SearchInput.vue'
import { useAchievementsStore } from '~/stores/achievements'
import AchievementItem from './AchievementItem.vue'

const store = useAchievementsStore()
const showLocked = ref(false)
const search = ref('')
const list = computed(() => showLocked.value ? store.list : store.unlockedList)
const filteredList = computed(() => {
  if (!search.value.trim())
    return list.value
  const q = search.value.toLowerCase()
  return list.value.filter(a => a.title.toLowerCase().includes(q))
})
</script>

<template>
  <ScrollablePanel>
    <template #header>
      <Button class="flex flex-1 items-center justify-between gap-2 text-sm" @click="showLocked = !showLocked">
        <span class="whitespace-nowrap" md="whitespace-normal">{{ showLocked ? 'Masquer' : 'Afficher' }} les succès verrouillés</span>
        <CheckBox :model-value="showLocked" @update:model-value="showLocked = $event" @click.stop />
      </Button>
      <SearchInput v-model="search" class="flex-1" />
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
