<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

// Liaison contrôlée pour la modale (propre)
const show = computed<boolean>({
  get: () => props.modelValue,
  set: (v: boolean) => emit('update:modelValue', v),
})

const audio = useAudioStore()
</script>

<template>
  <UiModal
    v-model="show"
    aria-labelledby="audio-modal-title"
    aria-describedby="audio-modal-desc"
    class="max-w-[400px] w-full"
    footer-close
    transition="fade scale"
  >
    <template #default>
      <div id="audio-modal-desc" class="flex flex-col gap-5 p-2 sm:p-4">
        <h3 id="audio-modal-title" class="text-center text-lg font-bold">
          Paramètres audio
        </h3>

        <section
          class="grid grid-cols-[auto_1fr] grid-rows-2 items-center gap-x-3 gap-y-2 sm:gap-x-4"
        >
          <div class="flex items-center justify-center">
            <UiCheckBox
              id="music-checkbox"
              v-model="audio.isMusicEnabled"
              aria-describedby="music-info"
              class="col-start-1 row-start-1"
              :class="audio.isMusicEnabled ? '' : 'opacity-60'"
            />
          </div>

          <!-- Ligne 1, colonne 2 : Label -->
          <label for="music-checkbox" class="col-start-2 row-start-1 cursor-pointer select-none font-medium">
            Musique
          </label>

          <!-- Ligne 2, colonne 1 : Input number (volume direct) -->
          <div class="h-full w-18">
            <UiNumberInput
              v-model="audio.musicVolume"
              :disabled="!audio.isMusicEnabled"
              aria-labelledby="music-label"
              class="col-start-1 row-start-2 w-full flex items-center justify-center h-full!"
              :min="0"
              :max="100"
              step="1"
              inputmode="numeric"
            />
          </div>
          <!-- Ligne 2, colonne 2 : Input range -->
          <div>
            <UiInputTipRange
              v-model="audio.musicVolume"
              :disabled="!audio.isMusicEnabled"
              aria-labelledby="music-label"
              :aria-disabled="!audio.isMusicEnabled"
              class="col-start-2 row-start-2 w-full"
            />
          </div>

          <!-- Info si musique désactivée (sous la grille en full width) -->
          <UiInfo
            v-if="!audio.isMusicEnabled"
            id="music-info"
            color="alert"
            class="col-span-2 row-start-3 mt-2"
          >
            Désactiver la musique réduit les dégâts de vos Shlagémons de 10%.<br>
            <small class="opacity-80">(Ba oui, je me suis pas cassé le cul à faire une bande-son pour rien !)</small>
          </UiInfo>
        </section>
        <!-- Bloc effets -->
        <section
          class="grid grid-cols-[auto_1fr] grid-rows-2 mt-6 items-center gap-x-3 gap-y-2 sm:gap-x-4"
        >
          <!-- Ligne 1, colonne 1 : Checkbox -->
          <div class="flex items-center justify-center">
            <UiCheckBox
              id="sfx-checkbox"
              v-model="audio.isSfxEnabled"
              aria-describedby="sfx-info"
              class="col-start-1 row-start-1"
              :class="audio.isSfxEnabled ? '' : 'opacity-60'"
            />
          </div>

          <!-- Ligne 1, colonne 2 : Label -->
          <label for="sfx-checkbox" class="col-start-2 row-start-1 cursor-pointer select-none font-medium">
            Effets sonores
          </label>

          <!-- Ligne 2, colonne 1 : Input number (volume direct) -->
          <div class="h-full w-18">
            <UiNumberInput
              v-model="audio.sfxVolume"
              :disabled="!audio.isSfxEnabled"
              aria-labelledby="sfx-label"
              class="col-start-1 row-start-2 w-full flex items-center justify-center h-full!"
              :min="0"
              :max="100"
              step="1"
              inputmode="numeric"
            />
          </div>

          <!-- Ligne 2, colonne 2 : Input range -->
          <div>
            <UiInputTipRange
              v-model="audio.sfxVolume"
              :disabled="!audio.isSfxEnabled"
              aria-labelledby="sfx-label"
              :aria-disabled="!audio.isSfxEnabled"
              class="col-start-2 row-start-2 w-full"
            />
          </div>

          <!-- Info si effets désactivés (optionnel, exemple) -->
          <UiInfo
            v-if="!audio.isSfxEnabled"
            id="sfx-info"
            color="alert"
            class="col-span-2 row-start-3 mt-2"
          >
            Attention, certains feedbacks sonores seront absents.<br>
            <small class="opacity-80">(Notamment les sons liés au Shiny, ça serait dommage d'en rater un, sale connasse !)</small>
          </UiInfo>
        </section>
      </div>
    </template>
  </UiModal>
</template>
