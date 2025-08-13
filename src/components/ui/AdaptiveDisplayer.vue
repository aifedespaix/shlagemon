<template>
  <div class="area overflow-hidden">
    <div class="area-flex flex gap-2 overflow-hidden">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.area {
  container-type: size;
  container-name: area;
  min-height: 0;
}

@container area (aspect-ratio > 1) {
  .area-grid {
    flex-direction: column;
  }
}

@container area (aspect-ratio < 1) {
  .area-grid {
    flex-direction: raw;
  }
}
</style>
