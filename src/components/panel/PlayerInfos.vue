<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { allShlagemons } from '~/data/shlagemons'
import { useBallStore } from '~/stores/ball'
import { useDiseaseStore } from '~/stores/disease'
import { useInventoryStore } from '~/stores/inventory'
import { usePlayerStore } from '~/stores/player'
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
        <span class="shrink-0 font-bold">{{ dex.shlagemons.length ?? 0 }} / {{ totalInDex }}</span>
      </div>
    </UiTooltip>
    <UiTooltip :text="t('components.panel.PlayerInfos.averageLevel')">
      <div class="min-w-0 flex items-center gap-1">
        <IconXp class="h-4 w-4" />
        <span class="shrink-0 font-bold">{{ dex.averageLevel.toFixed(1) }}</span>
      </div>
    </UiTooltip>
    <UiTooltip :text="t('components.panel.PlayerInfos.bonus')">
      <div
        class="min-w-0 flex cursor-pointer items-center gap-1"
        @click="showBonus = true"
      >
        <IconBonus class="h-4 w-4" />
        <span class="shrink-0 font-bold">+{{ Math.round(dex.bonusPercent) }}%</span>
      </div>
    </UiTooltip>
    <Modal v-model="showBonus" footer-close>
      <PanelBonusDetails />
    </Modal>
    <UiTooltip :text="t('components.panel.PlayerInfos.balls')">
      <div
        class="min-w-0 flex cursor-pointer items-center gap-1"
        @click="ballStore.open()"
      >
        <img
          src="/items/shlageball/shlageball.png"
          :alt="t('components.panel.PlayerInfos.ballAlt')"
          class="h-4 w-4"
          :style="{ filter: `hue-rotate(${ballHues[ballStore.current]})` }"
        >
        <span class="shrink-0 font-bold">{{ inventory.items[ballStore.current]?.toLocaleString() || 0 }}</span>
      </div>
    </UiTooltip>
    <BallSelectionModal />
  </div>
</template>
