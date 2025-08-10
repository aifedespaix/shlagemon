<script setup lang="ts">
import type { FloatingEntry } from '~/composables/useFloatingNumbers'
import type { ActiveEffect } from '~/type/effect'
import type { DexShlagemon } from '~/type/shlagemon'

interface Props {
  mon: DexShlagemon
  hp: number
  color?: string
  flipped?: boolean
  fainted?: boolean
  flash?: boolean
  levelPosition?: 'top' | 'bottom'
  showBall?: boolean
  owned?: boolean
  belongsToPlayer?: boolean
  effects?: ActiveEffect[]
  disease?: boolean
  diseaseRemaining?: number
}

const props = withDefaults(defineProps<Props>(), {
  color: undefined,
  flipped: false,
  fainted: false,
  flash: false,
  levelPosition: 'bottom',
  showBall: false,
  owned: false,
  belongsToPlayer: false,
  effects: () => [],
  disease: false,
  diseaseRemaining: 0,
})

const emit = defineEmits<{ (e: 'faintEnd'): void }>()

const { t } = useI18n()

const documentVisibility = useDocumentVisibility()
const visible = computed(() => documentVisibility.value === 'visible')

const { entries, remove } = useFloatingNumbers(toRef(props, 'hp'), visible)
const { pulsing } = useLevelUpAnimation(computed(() => props.mon.lvl))
const { onAnimationEnd, onFaintEnd } = useFaintAutoEmit(toRef(props, 'fainted'))
onFaintEnd(() => emit('faintEnd'))

const heldItem = useHeldItem(toRef(props, 'mon'))

const openTypeChart = useTypeChartAction(toRef(props, 'mon'))
const openInfo = useInfoAction(toRef(props, 'mon'), toRef(props, 'belongsToPlayer'))

const srMessages = computed(() => entries.value.map((f: FloatingEntry) =>
  f.kind === 'damage'
    ? t('components.battle.damageTaken', { amount: f.amount })
    : t('components.battle.healedFor', { amount: f.amount }),
))

const dex = useShlagedexStore()
const maxHp = computed(() => dex.maxHp(props.mon))
</script>

<template>
  <div
    class="relative h-full flex flex-1 flex-col items-center overflow-hidden"
    :class="[{ 'saturate-10 contrast-200': props.disease }, { flash: props.flash }]"
    @contextmenu.prevent="openInfo"
  >
    <BattleMonStatusBadges
      :effects="props.effects"
      :disease="props.disease"
      :disease-remaining="props.diseaseRemaining"
      @show-type-chart="openTypeChart"
    />

    <BattleMonHeldItemIcon
      v-if="heldItem"
      :item="heldItem"
      class="absolute bottom-9 left-0 z-150 h-6 w-6"
    />

    <BattleMonInfoButton
      class="absolute bottom-12 right-0 z-150"
      :label="t('components.battle.Shlagemon.infoTooltip')"
      @open-info="openInfo"
    />

    <BattleMonImageWithFaint
      :id="props.mon.base.id"
      :alt="t(props.mon.base.name)"
      :shiny="props.mon.isShiny"
      :flipped="props.flipped"
      :fainted="props.fainted"
      @faint-anim-end="onAnimationEnd"
    />

    <BattleMonLevelIndicator
      class="absolute left-0"
      :class="props.levelPosition === 'top' ? 'top-0' : 'bottom-0'"
      :level="props.mon.lvl"
      :pulsing="pulsing"
    />

    <BattleMonNameRow
      :name="t(props.mon.base.name)"
      :owned="props.owned"
      :show-ball="props.showBall"
      :shiny="props.mon.isShiny"
      :tooltip-owned="t('components.battle.Shlagemon.ownedTooltip')"
    >
      <template #anchor>
        <BattleMonFloatingNumbers :entries="entries" @end="remove" />
      </template>
      <template #sr>
        <template v-for="(msg, idx) in srMessages" :key="idx">
          {{ msg }}
        </template>
      </template>
    </BattleMonNameRow>

    <BattleMonHPPanel
      :value="props.hp"
      :max="maxHp"
      :color="props.color"
      :flash="props.flash"
    />
  </div>
</template>
