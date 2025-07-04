<script setup lang="ts">
import { ref } from 'vue'
import Button from '~/components/ui/Button.vue'
import SearchInput from '~/components/ui/SearchInput.vue'
import SelectOption from '~/components/ui/SelectOption.vue'
import { usePlayerStore } from '~/stores/player'

const store = usePlayerStore()

const pseudo = ref(store.pseudo)
const realName = ref(store.realName)
const gender = ref(store.gender)

function submit() {
  store.setPlayer({ pseudo: pseudo.value, realName: realName.value, gender: gender.value })
}
</script>

<route lang="yaml">
head:
  title: Profil Joueur
</route>

<template>
  <form class="m-auto max-w-96 flex flex-col gap-4 p-4" @submit.prevent="submit">
    <label class="flex flex-col gap-1">
      <span>Pseudo</span>
      <SearchInput v-model="pseudo" placeholder="Votre pseudo" />
    </label>
    <label class="flex flex-col gap-1">
      <span>Nom</span>
      <SearchInput v-model="realName" placeholder="Votre nom" />
    </label>
    <label class="flex flex-col gap-1">
      <span>Genre</span>
      <SelectOption
        v-model="gender"
        :options="[
          { label: 'Homme', value: 'male' },
          { label: 'Femme', value: 'female' },
          { label: 'Autre', value: 'unknown' },
        ]"
      />
    </label>
    <Button type="primary" class="mt-2">
      Valider
    </Button>
  </form>
</template>
