<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { allItems } from '~/data/items/items'
import { useDiseaseStore } from '~/stores/disease'
import { useShlagedexStore } from '~/stores/shlagedex'
import { useWearableEquipModalStore } from '~/stores/wearableEquipModal'
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
const equipModal = useWearableEquipModalStore()
const disease = useDiseaseStore()
const showConfirm = ref(false)

const heldItem = computed(() => {
  if (!props.mon?.heldItemId)
    return null
  return allItems.find(i => i.id === props.mon!.heldItemId) || null
})

const evolutionInfo = computed(() => {
  if (!props.mon?.base.evolution)
    return null
  const { condition } = props.mon.base.evolution
  if (condition.type === 'lvl')
    return `Peut évoluer au niveau ${condition.value}`
  if (condition.type === 'item')
    return `Peut évoluer grâce à l'objet ${condition.value.name}`
  return null
})

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

function openEquip() {
  if (props.mon)
    equipModal.open(props.mon)
}
const captureInfo = computed(() => {
  if (!props.mon)
    return { date: '', count: 0 }
  const date = new Date(props.mon.captureDate).toLocaleDateString()
  return { date, count: props.mon.captureCount }
})
</script>

<template>
  <div class="tiny-scrollbar h-full w-full overflow-y-auto">
    <div
      v-if="mon"
      class="max-w-xl w-full flex flex-col gap-2 rounded bg-white dark:bg-gray-900"
      :class="mon.rarity === 100 ? 'border-2 border-yellow-500 dark:border-yellow-400' : ''"
    >
      <h2 class="flex items-center justify-between text-lg font-bold">
        <div class="flex items-center gap-1">
          <span :class="mon.isShiny ? 'shiny-text' : ''">{{ mon.base.name }}</span>
          - lvl {{ mon.lvl }}<span v-if="isActiveAndSick"> (malade)</span>
        </div>
        <UiTooltip text="Plus un Pokémon est rare, plus son potentiel de puissance est élevé.">
          <ShlagemonRarity :rarity="mon.rarity" class="rounded-tr-0" />
        </UiTooltip>
      </h2>
      <div class="relative h-40 w-full">
        <div class="absolute flex gap-2">
          <ShlagemonType
            v-for="type in mon.base.types"
            :key="type.id"
            :value="type"
            open-on-click
          />
        </div>
        <ShlagemonImage
          :id="mon.base.id"
          :alt="mon.base.name"
          :shiny="mon.isShiny"
          class="w-full object-contain"
        />
        <div class="absolute right-0 top-0 flex items-center gap-1">
          <template v-if="heldItem">
            <div
              v-if="heldItem.icon"
              class="h-5 w-5"
              :class="[heldItem.icon, heldItem.iconClass]"
            />
            <img
              v-else-if="heldItem.image"
              :src="heldItem.image"
              :alt="heldItem.name"
              class="h-5 w-5 object-contain"
            >
            <UiButton
              type="icon"
              class="h-7 w-7"
              @click="wearableItemStore.removeHolder(heldItem.id)"
            >
              <div i-carbon-trash-can />
            </UiButton>
          </template>
          <UiButton
            v-else
            type="icon"
            class="h-7 w-7"
            title="Équiper un objet"
            @click="openEquip"
          >
            <div i-carbon-add />
          </UiButton>
        </div>
      </div>
      <div v-if="evolutionInfo" class="flex-center flex-col gap-1">
        <div class="rounded-full bg-blue-200 px-2 py-0.5 text-xs text-blue-800 dark:bg-blue-700 dark:text-blue-200">
          {{ evolutionInfo }}
        </div>
        <UiCheckBox v-model="allowEvolution" class="flex items-center gap-2 text-xs">
          Autoriser ce Shlagémon à évoluer ?
        </UiCheckBox>
      </div>
      <p class="tiny-scrollbar max-h-25 overflow-auto text-sm italic">
        {{ mon.base.description }}
      </p>
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
      <ShlagemonXpBar :mon="mon" />
      <div class="w-full flex items-center justify-center gap-2 text-xs">
        <p class="">
          Première capture : {{ captureInfo.date }}
        </p>
        <p>
          Obtenu {{ captureInfo.count }} fois
        </p>
      </div>
      <div class="flex justify-end gap-2">
        <UiButton type="danger" class="flex items-center gap-1" @click="requestRelease">
          <div i-carbon-trash-can />
          Relâcher
        </UiButton>
        <UiButton
          type="primary"
          class="flex flex-1 items-center gap-1"
          :disabled="isActive"
          @click="setActive"
        >
          <div i-carbon-star-filled />
          Principal
        </UiButton>
      </div>
      <Modal v-model="showConfirm" :close-on-outside-click="false">
        <div class="flex flex-col items-center gap-4">
          <h3 class="text-lg font-bold">
            Relâcher un Shlagémon ?
          </h3>
          <p class="text-center text-sm">
            Attention, si vous le relâchez, il ira shlagiser tout le territoire.
          </p>
          <div class="flex gap-2">
            <UiButton type="valid" class="flex items-center gap-1" @click="confirmRelease">
              <div i-carbon-checkmark />
              Oui
            </UiButton>
            <UiButton type="danger" class="flex items-center gap-1" @click="cancelRelease">
              <div i-carbon-close />
              Non
            </UiButton>
          </div>
        </div>
      </Modal>
    </div>
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
