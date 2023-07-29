<template>
  <transition enter-active-class="duration-100 animate-translate ease-out"
              enter-from-class="opacity-0 -translate-y-4" enter-to-class="opacity-100"
              leave-active-class="duration-100"
              leave-to-class="opacity-0 -translate-y-4"
  >
    <slot></slot>
  </transition>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>