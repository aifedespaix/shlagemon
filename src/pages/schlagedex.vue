<script setup lang="ts">
import PanelShlagedex from '~/components/panel/Shlagedex.vue'
import UiPanelWrapper from '~/components/ui/PanelWrapper.vue'
</script>

<route lang="yaml">
meta:
  layout: home
head:
  title: Shlagédex
</route>

<template>
  <div class="mx-auto max-w-160 w-full p-4">
    <UiPanelWrapper title="Shlagédex" class="overflow-hidden">
      <PanelShlagedex />
    </UiPanelWrapper>
  </div>
</template>
