<script setup lang="ts">
import { ref } from 'vue'
import Profile from '~/components/profile/Profile.vue'
import ThemeToggle from '~/components/ThemeToggle.vue'
import Button from '~/components/ui/Button.vue'
import { useSaveStore } from '~/stores/save'

const save = useSaveStore()

const showProfile = ref(false)

function reset() {
  save.reset()
}
</script>

<template>
  <header class="h-12 flex items-center justify-between bg-gray-100 p-4 dark:bg-gray-800">
    <img src="/logo.png" alt="Logo Shlagémon" class="h-20 -my-4">
    <div class="flex items-center gap-2">
      <ThemeToggle />
      <Button type="icon" aria-label="Profil" @click="showProfile = true">
        <div class="i-carbon-user" />
      </Button>
      <button class="p-1" aria-label="Reset Save" @click="reset">
        <div class="i-carbon-trash-can text-red" />
      </button>
      <Profile v-model="showProfile" />
    </div>
  </header>
</template>
