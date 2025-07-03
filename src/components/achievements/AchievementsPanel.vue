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
  <div class="flex flex-col gap-2">
    <Button class="w-full flex items-center justify-between text-sm" @click="showLocked = !showLocked">
      <span>{{ showLocked ? 'Masquer' : 'Afficher' }} les succès verrouillés</span>
      <CheckBox :model-value="showLocked" @update:model-value="showLocked = $event" @click.stop />
    </Button>
    <SearchInput v-model="search" class="w-full" />
    <AchievementItem
      v-for="a in filteredList"
      :key="a.id"
      :achievement="a"
    />
  </div>
</template>
