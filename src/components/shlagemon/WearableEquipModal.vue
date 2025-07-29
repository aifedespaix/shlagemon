<script setup lang="ts">
const store = useWearableEquipModalStore()
const { t } = useI18n()
</script>

<template>
  <UiModal v-model="store.isVisible" footer-close>
    <div class="flex flex-col items-center gap-2">
      <h3 class="text-center text-lg font-bold">
        {{ t('components.shlagemon.WearableEquipModal.title') }}
      </h3>
      <div v-if="store.options.length" class="w-full flex flex-col gap-2">
        <UiButton
          v-for="o in store.options"
          :key="o.item.id"
          class="flex items-center justify-between gap-2"
          :disabled="o.qty <= 0"
          @click="store.equip(o.item.id)"
        >
          <div class="flex items-center gap-2">
            <div v-if="o.item.icon" class="h-6 w-6" :class="[o.item.icon, o.item.iconClass]" />
            <img v-else-if="o.item.image" :src="o.item.image" :alt="t(o.item.name)" class="h-6 w-6 object-contain">
            <span>{{ t(o.item.name) }}</span>
          </div>
          <span class="text-xs font-bold">x{{ o.qty }}</span>
        </UiButton>
      </div>
      <p v-else class="text-center text-sm">
        {{ t('components.shlagemon.WearableEquipModal.noAvailable') }}
      </p>
    </div>
  </UiModal>
</template>
