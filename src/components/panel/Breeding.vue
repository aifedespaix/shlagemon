<script setup lang="ts">
import type { EggType } from '~/stores/egg'
import type { Character } from '~/type/character'
import type { DexShlagemon } from '~/type/shlagemon'
import DialogBox from '~/components/dialog/Box.vue'

import { norman } from '~/data/characters/norman'
import { toast } from '~/modules/toast'
import { BREEDING_DURATION_MS, breedingCost } from '~/utils/breeding'

const { t } = useI18n()
const dialog = useDialogStore()
const breeding = useBreedingStore()
const game = useGameStore()
const panel = useMainPanelStore()

const currentPartner = ref<Character>(norman)
const selected = ref<DexShlagemon | null>(null)
const selectorOpen = ref(false)
const now = ref(Date.now())
const justCompleted = ref(false)

const eggType = computed<EggType | null>(() =>
  selected.value ? selected.value.base.types[0] as EggType : null,
)
const job = computed(() => (eggType.value ? breeding.getJob(eggType.value) : null))
const cost = computed(() => selected.value ? breedingCost(selected.value.rarity) : 0)
const durationMin = Math.round(BREEDING_DURATION_MS / 60000)
const remaining = computed(() => eggType.value ? breeding.remainingMs(eggType.value) : 0)
const progress = computed(() => eggType.value ? breeding.progress(eggType.value) : 0)
const remainingLabel = computed(() => {
  const total = Math.ceil(remaining.value / 1000)
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${m}:${String(s).padStart(2, '0')}`
})
const endsAtLabel = computed(() => job.value ? useDateFormat(job.value.endsAt, 'HH:mm').value : '')

function openSelector() {
  selectorOpen.value = true
}
function selectMon(mon: DexShlagemon) {
  selected.value = mon
  selectorOpen.value = false
}
function start() {
  if (!eggType.value || !selected.value)
    return
  if (breeding.start(eggType.value, selected.value.rarity)) {
    toast.success(t('components.panel.Breeding.toast.started'))
    justCompleted.value = false
  }
}
function goToEgg() {
  panel.showPoulailler()
}

const { pause: pauseTick } = useIntervalFn(() => {
  now.value = Date.now()
  if (eggType.value && breeding.completeIfDue(eggType.value)) {
    toast.success(t('components.panel.Breeding.toast.finished'))
    justCompleted.value = true
  }
}, 1000)
onBeforeUnmount(pauseTick)

onMounted(() => {
  if (!dialog.dialogs.some(d => d.id === 'breedingIntro')) {
    dialog.dialogs.unshift({
      id: 'breedingIntro',
      component: markRaw(DialogBox),
      condition: () => !dialog.isDone('breedingIntro'),
      props: {
        character: currentPartner.value,
        dialogTree: [
          {
            id: 'start',
            text: t('components.panel.Breeding.introDialog'),
            responses: [
              {
                label: t('components.panel.Breeding.introOk'),
                type: 'valid',
                action: () => dialog.markDone('breedingIntro'),
              },
            ],
          },
        ],
      },
    })
  }
})
</script>

<template>
  <div class="mx-auto max-w-160 w-full flex flex-col gap-4 p-4">
    <header class="flex items-center gap-2">
      <h1 class="flex-1 text-xl font-bold">
        {{ t('components.panel.Breeding.name') }}
      </h1>
      <CharacterImage :id="currentPartner.id" :alt="currentPartner.name" class="max-h-12 w-12" />
    </header>

    <section class="flex flex-col gap-3">
      <UiButton
        type="default"
        class="flex items-center self-start gap-1"
        :aria-label="t('components.panel.Breeding.a11y.openSelector')"
        @click="openSelector"
      >
        <div class="i-carbon:add-alt" aria-hidden="true" />
        {{ selected ? t('components.panel.Breeding.selected') : t('components.panel.Breeding.selectMon') }}
      </UiButton>

      <div v-if="selected" class="flex items-center gap-3">
        <ShlagemonImage
          :id="selected.base.id"
          :alt="t(selected.base.name)"
          :shiny="selected.isShiny"
          class="h-16 w-16 object-contain"
        />
        <div class="text-sm">
          <div>{{ t('components.panel.Breeding.rarity') }}: <span class="tabular-nums">{{ selected.rarity }}</span></div>
          <div class="flex items-center gap-1">
            {{ t('components.panel.Breeding.cost') }}:
            <UiCurrencyAmount :amount="cost" currency="shlagidolar" />
          </div>
          <div>
            {{ t('components.panel.Breeding.duration') }}: {{ durationMin }} {{ t('components.panel.Breeding.minutes') }}
          </div>
        </div>
      </div>
    </section>

    <section v-if="job" class="flex flex-col gap-2 border rounded-lg bg-white/60 p-4 dark:bg-gray-900/40">
      <UiProgressBar
        :value="progress"
        :max="1"
        class="h-2 w-full transition-[width] duration-300 motion-reduce:transition-none"
        :aria-label="t('components.panel.Breeding.progress')"
      />
      <div class="flex justify-between text-sm">
        <span>{{ t('components.panel.Breeding.remaining') }}: <span class="tabular-nums">{{ remainingLabel }}</span></span>
        <span>{{ t('components.panel.Breeding.endsAt', { time: endsAtLabel }) }}</span>
      </div>
    </section>

    <UiButton
      v-if="selected"
      :disabled="cost > game.shlagidolar || breeding.isRunning(eggType!)"
      type="primary"
      class="flex items-center self-start gap-2"
      :aria-label="t('components.panel.Breeding.a11y.startBreeding')"
      @click="start"
    >
      {{ t('components.panel.Breeding.cta.payAndStart') }}
      <UiCurrencyAmount :amount="cost" currency="shlagidolar" />
    </UiButton>

    <UiButton
      v-if="justCompleted"
      type="primary"
      variant="outline"
      class="self-start"
      :aria-label="t('components.panel.Breeding.a11y.goToEgg')"
      @click="goToEgg"
    >
      {{ t('components.panel.Breeding.cta.seeEgg') }}
    </UiButton>

    <UiModal
      v-model="selectorOpen"
      role="dialog"
      aria-modal="true"
      aria-labelledby="breeding-select-title"
    >
      <div class="max-w-160 flex flex-col gap-2">
        <h3 id="breeding-select-title" class="text-center text-lg font-bold">
          {{ t('components.panel.Breeding.selectMon') }}
        </h3>
        <div class="max-h-80 min-h-0 overflow-y-auto">
          <ShlagemonQuickSelect @select="selectMon" />
        </div>
      </div>
    </UiModal>
  </div>
</template>
