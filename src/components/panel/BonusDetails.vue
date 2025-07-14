<script setup lang="ts">
const dex = useShlagedexStore()
</script>

<template>
  <div class="flex flex-col gap-2 text-sm">
    <p>
      Le bonus du Shlagedex correspond à votre
      <strong>Shlag&eacute;Dex potentiel</strong>.
      Il repr&eacute;sente le bonus maximal que vous pourriez obtenir en
      capturant tous les Shlag&eacute;mon accessibles.
    </p>
    <p>
      Il se base sur le pourcentage de compl&eacute;tion de ce Shlagedex
      potentiel ainsi que sur le niveau moyen de votre &eacute;quipe.
    </p>
    <p class="text-center text-xs font-mono">
      Bonus = niveau moyen × 2 × (taux de complétion / 100)
    </p>
    <div class="mt-2 flex flex-col gap-1">
      <div class="flex items-center gap-2">
        <IconShlagedex class="h-5 w-5" />
        <span>Complétion : {{ Math.round(dex.potentialCompletionPercent) }}%</span>
      </div>
      <div class="flex items-center gap-2">
        <IconXp class="h-5 w-5" />
        <span>Niveau moyen : {{ dex.averageLevel.toFixed(1) }}</span>
      </div>
      <div class="flex items-center gap-2">
        <IconBonus class="h-5 w-5" />
        <span>Bonus actuel : +{{ Math.round(dex.bonusPercent) }}%</span>
      </div>
    </div>
  </div>
</template>
