<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

interface Props {
  /** Rarity value between 1 and 100. */
  rarity: number
}

defineOptions({ inheritAttrs: false })
const props = defineProps<Props>()
const attrs = useAttrs() as HTMLAttributes
const { t } = useI18n()
</script>

<template>
  <ShlagemonRarity
    v-tooltip="t('components.shlagemon.RarityInfo.tooltip')"
    :rarity="props.rarity"
    v-bind="attrs"
  />
</template>
