<script setup lang="ts">
const box = useBadgeBoxStore()
const { t } = useI18n()
</script>

<template>
  <UiModal v-model="box.isModalOpen" footer-close>
    <div class="flex flex-col gap-2">
      <h3 class="text-center text-lg font-bold">
        {{ t('components.badge.BoxModal.title') }}
      </h3>
      <div v-if="box.badges.length" class="flex flex-col gap-1 p-1">
        <UiListItem
          v-for="badge in box.badges"
          :key="badge.id"
          as="div"
          class="items-center justify-between border-b p-1"
        >
          <template #left>
            <div class="flex items-center gap-1">
              <div class="h-6 w-6">
                <img
                  :src="`/icons/badges/${badge.id}.webp`"
                  :alt="t(badge.name)"
                  class="h-full w-full object-contain"
                >
              </div>
              <span class="text-sm">{{ t(badge.name) }}</span>
            </div>
          </template>
          <template #right>
            <span class="text-xs font-bold">
              {{ t('components.badge.BoxModal.level', { level: badge.levelCap }) }}
            </span>
          </template>
        </UiListItem>
      </div>
      <span v-else class="text-center text-sm">{{ t('components.badge.BoxModal.empty') }}</span>
    </div>
  </UiModal>
</template>
