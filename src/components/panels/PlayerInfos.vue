<script setup lang="ts">
import BallSelectionModal from '~/components/ball/BallSelectionModal.vue'
import BonusIcon from '~/components/icons/bonus.vue'
import SchlagedexIcon from '~/components/icons/schlagedex.vue'
import XpIcon from '~/components/icons/xp.vue'
import Modal from '~/components/modal/Modal.vue'
import BonusDetails from '~/components/panels/BonusDetails.vue'
import CurrencyAmount from '~/components/ui/CurrencyAmount.vue'
import Tooltip from '~/components/ui/Tooltip.vue'
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

const totalInDex = allShlagemons.length
</script>

<template>
  <div
    class="w-full inline-flex items-center justify-around gap-3 rounded bg-white text-xs dark:bg-gray-900"
    sm="text-sm"
  >
    <span v-if="player.pseudo" class="min-w-0 flex items-center gap-1 font-bold">
      {{ player.pseudo }}
      <Tooltip
        v-if="disease.active"
        :text="`Malade : ${disease.remaining} combats restants`"
      >
        <div class="i-mdi:emoticon-sick text-red-500" />
      </Tooltip>
    </span>
    <CurrencyAmount :amount="game.shlagidolar" currency="shlagidolar" />
    <CurrencyAmount :amount="game.shlagidiamond" currency="shlagidiamond" />
    <Tooltip text="SchlagéDex">
      <div class="min-w-0 flex items-center gap-1">
        <SchlagedexIcon class="h-4 w-4" />
        <span class="shrink-0 font-bold">{{ dex.shlagemons.length ?? 0 }} / {{ totalInDex }}</span>
      </div>
    </Tooltip>
    <Tooltip text="Niveau moyen">
      <div class="min-w-0 flex items-center gap-1">
        <XpIcon class="h-4 w-4" />
        <span class="shrink-0 font-bold">{{ dex.averageLevel.toFixed(1) }}</span>
      </div>
    </Tooltip>
    <Tooltip text="Bonus">
      <div
        class="min-w-0 flex cursor-pointer items-center gap-1"
        @click="showBonus = true"
      >
        <BonusIcon class="h-4 w-4" />
        <span class="shrink-0 font-bold">+{{ Math.round(dex.bonusPercent) }}%</span>
      </div>
    </Tooltip>
    <Modal v-model="showBonus" footer-close>
      <BonusDetails />
    </Modal>
    <Tooltip text="SchlagéBalls">
      <div
        class="min-w-0 flex cursor-pointer items-center gap-1"
        @click="ballStore.open()"
      >
        <img
          src="/items/shlageball/shlageball.png"
          alt="ball"
          class="h-4 w-4"
          :style="{ filter: `hue-rotate(${ballHues[ballStore.current]})` }"
        >
        <span class="shrink-0 font-bold">{{ inventory.items[ballStore.current]?.toLocaleString() || 0 }}</span>
      </div>
    </Tooltip>
    <BallSelectionModal />
  </div>
</template>
