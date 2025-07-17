<template>
  <section class="h-full w-full flex flex-col gap-2 overflow-hidden">
    <div class="flex flex-wrap gap-2 px-1">
      <slot name="header" />
    </div>
    <div class="tiny-scrollbar flex flex-col gap-2 overflow-x-hidden overflow-y-auto py-1">
      <slot name="content" />
    </div>
  </section>
</template>
