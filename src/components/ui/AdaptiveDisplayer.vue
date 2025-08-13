<template>
  <div class="area overflow-hidden">
    <div class="area-flex h-full flex gap-2 overflow-hidden">
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
  .area-flex {
    flex-direction: row;
  }
}

@container area (aspect-ratio < 1) {
  .area-flex {
    flex-direction: column;
  }
}
</style>
