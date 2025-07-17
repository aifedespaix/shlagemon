<script setup lang="ts">
</script>

<template>
  <footer class="border-gray-200 bg-gray-100 p-4 text-center text-xs font-size-2.5 text-gray-600 -m-4 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
    <div class="font-bold">
      © 2025 <span v-if="new Date().getFullYear() !== 2025">- {{ new Date().getFullYear() }}</span> Shlagémon
    </div>
    <div class="italic">
      Surement quelques droits réservés.
    </div>
    <div class="">
      La plupart des images sont générés par des IA qui volent le travail des artistes, désolé c'est parce-que je sais pas dessiner et que j'ai pas le moyen d'acheter des dessins.
    </div>
  </footer>
</template>
