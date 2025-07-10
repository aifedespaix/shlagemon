<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { computed, ref } from 'vue'
import MultiExpIcon from '~/components/icons/multi-exp.vue'
import Modal from '~/components/modal/Modal.vue'
import Button from '~/components/ui/Button.vue'
import CheckBox from '~/components/ui/CheckBox.vue'
import Tooltip from '~/components/ui/Tooltip.vue'
import { useDiseaseStore } from '~/stores/disease'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useWearableItemStore } from '~/stores/wearableItem'

const props = defineProps<{ mon: DexShlagemon | null }>()
const emit = defineEmits<{
  (e: 'release'): void
  (e: 'active'): void
}>()

const statColors = [
  'bg-red-200 dark:bg-red-700',
  'bg-emerald-200 dark:bg-emerald-700',
  'bg-blue-200 dark:bg-blue-700',
  'bg-amber-200 dark:bg-amber-700',
  'bg-violet-200 dark:bg-violet-700',
  'bg-pink-200 dark:bg-pink-700',
]

const stats = computed(() => {
  if (!props.mon)
    return []
  return [
    { label: 'HP', value: props.mon.hp },
    { label: 'Attaque', value: props.mon.attack },
    { label: 'Défense', value: props.mon.defense },
    { label: 'Puanteur', value: props.mon.smelling },
  ]
})

const allowEvolution = computed({
  get: () => props.mon?.allowEvolution ?? true,
  set: (val: boolean) => {
    if (props.mon)
      // eslint-disable-next-line vue/no-mutating-props
      (props.mon.allowEvolution = val)
  },
})

const store = useShlagedexStore()
const wearableItemStore = useWearableItemStore()
const disease = useDiseaseStore()
const showConfirm = ref(false)

const isActive = computed(() => props.mon?.id === store.activeShlagemon?.id)

function setActive() {
  if (props.mon) {
    store.setActiveShlagemon(props.mon)
    emit('active')
  }
}

const isActiveAndSick = computed(() =>
  disease.active && props.mon?.id === store.activeShlagemon?.id,
)

function requestRelease() {
  showConfirm.value = true
}

function confirmRelease() {
  if (props.mon)
    store.releaseShlagemon(props.mon)
  emit('release')
  showConfirm.value = false
}

function cancelRelease() {
  showConfirm.value = false
}
const captureInfo = computed(() => {
  if (!props.mon)
    return { date: '', count: 0 }
  const date = new Date(props.mon.captureDate).toLocaleDateString()
  return { date, count: props.mon.captureCount }
})
</script>

<template>
  <div v-if="mon" class="max-w-sm w-full rounded bg-white dark:bg-gray-900">
    <h2 class="mb-2 flex items-center justify-between text-lg font-bold">
      <div class="flex items-center gap-1">
        <span :class="mon.isShiny ? 'shiny-text' : ''">{{ mon.base.name }}</span>
        - lvl {{ mon.lvl }}<span v-if="isActiveAndSick"> (malade)</span>
      </div>
      <Tooltip text="Plus un Pokémon est rare, plus son potentiel de puissance est élevé.">
        <ShlagemonRarity :rarity="mon.rarity" class="rounded-tr-0 -m-r-4 -m-t-4" />
      </Tooltip>
    </h2>
    <div class="flex gap-2">
      <ShlagemonType v-for="type in mon.base.types" :key="type.id" :value="type" />
    </div>
    <div class="relative mb-2 w-full">
      <ShlagemonImage
        :id="mon.base.id"
        :alt="mon.base.name"
        :shiny="mon.isShiny"
        class="h-full max-h-40 w-full object-contain"
      />
      <div
        v-if="wearableItemStore.getHolderId('multi-exp') === mon.id"
        class="absolute right-0 top-0 flex items-center gap-1"
      >
        <MultiExpIcon class="h-5 w-5" />
        <Button
          type="icon"
          class="h-5 w-5"
          @click="wearableItemStore.removeHolder('multi-exp')"
        >
          <div i-carbon-trash-can />
        </Button>
      </div>
    </div>
    <p class="tiny-scrollbar mb-4 max-h-25 overflow-auto text-sm italic -m-r-4">
      {{ mon.base.description }}
    </p>
    <CheckBox v-model="allowEvolution" class="mb-4 flex items-center gap-2 text-sm">
      Autoriser ce Shlagémon à évoluer ?
    </CheckBox>
    <div class="grid grid-cols-2 gap-2 text-sm">
      <div
        v-for="(stat, i) in stats"
        :key="stat.label"
        class="flex flex-col items-center rounded p-2 text-gray-900 transition-colors dark:text-white"
        :class="statColors[i % statColors.length]"
        hover="opacity-80"
      >
        <span class="font-semibold">{{ stat.label }}</span>
        <span class="text-base">{{ stat.value.toLocaleString() }}</span>
      </div>
    </div>
    <ShlagemonXpBar :mon="mon" class="mt-4" />
    <div class="w-full flex items-center justify-center gap-2 text-xs">
      <p class="">
        Première capture : {{ captureInfo.date }}
      </p>
      <p>
        Obtenu {{ captureInfo.count }} fois
      </p>
    </div>
    <div class="mt-4 flex justify-end gap-2">
      <Button type="danger" class="flex items-center gap-1" @click="requestRelease">
        <div i-carbon-trash-can />
        Relâcher
      </Button>
      <Button
        type="primary"
        class="flex flex-1 items-center gap-1"
        :disabled="isActive"
        @click="setActive"
      >
        <div i-carbon-star-filled />
        Principal
      </Button>
    </div>
    <Modal v-model="showConfirm" :close-on-outside-click="false">
      <div class="flex flex-col items-center gap-4">
        <h3 class="text-lg font-bold">
          Relâcher un Shlagémon ?
        </h3>
        <p class="text-center text-sm">
          Attention, si vous le relâchez, il ira schlagiser tout le territoire.
        </p>
        <div class="flex gap-2">
          <Button type="valid" class="flex items-center gap-1" @click="confirmRelease">
            <div i-carbon-checkmark />
            Oui
          </Button>
          <Button type="danger" class="flex items-center gap-1" @click="cancelRelease">
            <div i-carbon-close />
            Non
          </Button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style>
.shiny-text {
  background: linear-gradient(90deg, #ff00cc, #3333ff, #00ffff, #00ff00, #ffff00, #ff9900, #ff0000);
  background-size: 400% 400%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shiny-rainbow 5s linear infinite;
  display: inline-block;
}

@keyframes shiny-rainbow {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
