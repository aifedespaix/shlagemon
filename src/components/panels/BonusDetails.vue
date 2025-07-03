<script setup lang="ts">
import BonusIcon from '~/components/icons/bonus.vue'
import SchlagedexIcon from '~/components/icons/schlagedex.vue'
import XpIcon from '~/components/icons/xp.vue'

const dex = useShlagedexStore()
</script>

<template>
  <div class="flex flex-col gap-2 text-sm">
    <p>Le bonus augmente les dégâts infligés par vos Schlagemon.</p>
    <p>
      Il se base sur le pourcentage de complétion du Schlagedex et sur le niveau
      moyen de votre équipe.
    </p>
    <p class="text-center text-xs font-mono">
      Bonus = niveau moyen × 2 × (taux de complétion / 100)
    </p>
    <div class="mt-2 flex flex-col gap-1">
      <div class="flex items-center gap-2">
        <SchlagedexIcon class="h-5 w-5" />
        <span>Complétion : {{ Math.round(dex.completionPercent) }}%</span>
      </div>
      <div class="flex items-center gap-2">
        <XpIcon class="h-5 w-5" />
        <span>Niveau moyen : {{ dex.averageLevel.toFixed(1) }}</span>
      </div>
      <div class="flex items-center gap-2">
        <BonusIcon class="h-5 w-5" />
        <span>Bonus actuel : +{{ Math.round(dex.bonusPercent) }}%</span>
      </div>
    </div>
  </div>
</template>
