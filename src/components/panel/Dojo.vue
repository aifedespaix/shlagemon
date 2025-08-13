<script setup lang="ts">
import type { DexShlagemon } from '~/type/shlagemon'
import { toast } from '~/modules/toast'
import { dojoTrainingCost, useDojoStore } from '~/stores/dojo'

const panel = useMainPanelStore()
const dojo = useDojoStore()
const game = useGameStore()
const { t } = useI18n()

const selected = ref<DexShlagemon | null>(null)
const selectorOpen = ref(false)
const points = ref(1)
const now = ref(Date.now())
useIntervalFn(() => {
  now.value = Date.now()
}, 1000)

const job = computed(() => selected.value ? dojo.getJob(selected.value.id) : null)
const maxPoints = computed(() => selected.value ? Math.max(0, 100 - selected.value.rarity) : 0)
watch(selected, () => {
  points.value = 1
})
const cost = computed(() => selected.value ? dojoTrainingCost(selected.value.rarity, points.value) : 0)
const durationMin = computed(() => points.value)
const remaining = computed(() => job.value ? Math.max(0, Math.ceil(dojo.remainingMs(job.value.monId) / 1000)) : 0)
const progress = computed(() => job.value ? dojo.progressRatio(job.value.monId) * 100 : 0)

watch(now, () => {
  if (selected.value) {
    if (dojo.completeIfDue(selected.value.id))
      toast.success(t('components.panel.Dojo.toast.finished'))
  }
})

function openSelector() {
  selectorOpen.value = true
}
function selectMon(mon: DexShlagemon) {
  selected.value = mon
  selectorOpen.value = false
}
function start() {
  if (!selected.value)
    return
  const res = dojo.startTraining(selected.value.id, selected.value.rarity, points.value)
  if (res.ok) {
    toast.success(t('components.panel.Dojo.toast.started'))
  }
}
</script>

<template>
  <LayoutTitledPanel
    :title="t('components.panel.Dojo.title')"
    :exit-text="t('components.panel.Dojo.cta.selectFirst')"
    @exit="panel.showVillage()"
  >
    <div class="flex flex-1 flex-col gap-4">
      <UiButton v-if="!selected" type="primary" @click="openSelector">
        {{ t('components.panel.Dojo.selectMon') }}
      </UiButton>
      <div v-else class="flex flex-col items-center gap-4">
        <ShlagemonImage
          :id="selected.base.id"
          :alt="t(selected.base.name)"
          class="h-32 w-32"
        />
        <div class="text-sm">
          {{ t('components.panel.Dojo.rarity.current') }}:
          {{ selected.rarity }} → {{ Math.min(100, selected.rarity + points) }}
        </div>
        <div class="w-24">
          <UiNumberInput v-model="points" :min="1" :max="maxPoints" />
        </div>
        <div class="text-sm">
          {{ t('components.panel.Dojo.cost.label') }}:
          <UiCurrencyAmount :amount="cost" currency="shlagidolar" />
        </div>
        <div class="text-sm">
          {{ t('components.panel.Dojo.duration.label') }}:
          {{ durationMin }}
          {{ durationMin === 1 ? t('components.panel.Dojo.duration.minute') : t('components.panel.Dojo.duration.minutes') }}
        </div>
        <UiButton
          v-if="!job"
          :disabled="cost > game.shlagidolar || points < 1"
          type="primary"
          @click="start"
        >
          {{ t('components.panel.Dojo.cta.payAndStart') }}
        </UiButton>
        <div v-else class="w-full flex flex-col gap-2">
          <div class="h-2 w-full rounded bg-gray-300">
            <div class="h-full rounded bg-green-500" :style="{ width: `${progress}%` }" />
          </div>
          <p class="text-center text-sm">
            {{ t('components.panel.Dojo.duration.remaining') }}:
            {{ Math.ceil(remaining / 60) }}
            {{ t('components.panel.Dojo.duration.minutes') }}
          </p>
        </div>
      </div>
    </div>
    <UiModal v-model="selectorOpen" role="dialog" aria-labelledby="dojo-select-title">
      <div class="flex flex-col gap-2">
        <h3 id="dojo-select-title" class="text-center text-lg font-bold">
          {{ t('components.panel.Dojo.selectMon') }}
        </h3>
        <ShlagemonQuickSelect class="max-h-60vh" @select="selectMon" />
      </div>
    </UiModal>
  </LayoutTitledPanel>
</template>
