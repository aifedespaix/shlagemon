<script lang="ts" setup>
const game = useGameStore()
</script>

<template>
  <div>
    <div class="mt-2 text-sm">
      Shlagidolars : {{ game.shlagidolar }}
    </div>
  </div>
</template>
