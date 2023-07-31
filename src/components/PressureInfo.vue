<template>
  <section
      class="backdrop-blur flex flex-col items-center justify-center grow gap-2 border border-white/40 shadow-md shadow-white/10 p-2 rounded-md min-w-[100px]">
    <h1>pressure</h1>
    <hr class="w-full border-white/40">
    <div class="flex items-center">
      <span class="font-semibold text-3xl">{{ props.value ?? '--' }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{value:number}>()
</script>

<style scoped>

</style>