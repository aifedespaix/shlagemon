<script setup lang="ts">
import AnimatedNumber from '~/components/ui/AnimatedNumber.vue'
import { allShlagemons } from '~/data/shlagemons'
import { ballHues } from '~/utils/ball'

const game = useGameStore()
const dex = useShlagedexStore()
const inventory = useInventoryStore()
const ballStore = useBallStore()
const player = usePlayerStore()
const disease = useDiseaseStore()

const showBonus = ref(false)
const { t } = useI18n()

const totalInDex = allShlagemons.length

const currentBallHue = computed(() => ballStore.current ? ballHues[ballStore.current] : '0deg')
const currentBallCount = computed(() => ballStore.current ? inventory.items[ballStore.current] ?? 0 : 0)
</script>

<template>
  <div
    class="w-full inline-flex items-center justify-around gap-3 rounded bg-white p-1 text-xs dark:bg-gray-900"
    sm="text-sm"
  >
    <span v-if="player.pseudo" class="min-w-0 flex items-center gap-1 font-bold">
      {{ player.pseudo }}
      <UiTooltip
        v-if="disease.active"
        :text="t('components.panel.PlayerInfos.sick', { n: disease.remaining })"
      >
        <div class="i-mdi:emoticon-sick text-red-500" />
      </UiTooltip>
    </span>
    <UiCurrencyAmount :amount="game.shlagidolar" currency="shlagidolar" />
    <UiCurrencyAmount :amount="game.shlagidiamond" currency="shlagidiamond" />
    <UiTooltip :text="t('components.panel.PlayerInfos.dex')">
      <div class="min-w-0 flex items-center gap-1">
        <IconShlagedex class="h-4 w-4" />
        <AnimatedNumber class="shrink-0 font-bold" :value="dex.shlagemons.length ?? 0" />
        <span class="shrink-0">/ {{ totalInDex }}</span>
      </div>
    </UiTooltip>
    <UiTooltip :text="t('components.panel.PlayerInfos.averageLevel')">
      <div class="min-w-0 flex items-center gap-1">
        <IconXp class="h-4 w-4" />
        <AnimatedNumber class="shrink-0 font-bold" :value="Number(dex.averageLevel.toFixed(1))" :precision="1" />
      </div>
    </UiTooltip>
    <UiTooltip :text="t('components.panel.PlayerInfos.bonus')">
      <div
        class="min-w-0 flex cursor-pointer items-center gap-1"
        @click="showBonus = true"
      >
        <IconBonus class="h-4 w-4" />
        <span class="shrink-0 font-bold">+<AnimatedNumber :value="Math.round(dex.bonusPercent)" />%</span>
      </div>
    </UiTooltip>
    <UiModal v-model="showBonus" footer-close>
      <PanelBonusDetails />
    </UiModal>
    <UiTooltip :text="t('components.panel.PlayerInfos.balls')">
      <div
        class="min-w-0 flex cursor-pointer items-center gap-1"
        @click="ballStore.open()"
      >
        <img
          src="/items/shlageball/shlageball.webp"
          :alt="t('components.panel.PlayerInfos.ballAlt')"
          class="h-4 w-4"
          :style="{ filter: `hue-rotate(${currentBallHue})` }"
        >
        <AnimatedNumber class="shrink-0 font-bold" :value="currentBallCount" />
      </div>
    </UiTooltip>
    <BallSelectionModal />
  </div>
</template>
