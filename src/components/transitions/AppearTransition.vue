<template>
  <transition enter-from-class="opacity-0" enter-to-class="opacity-100"
              enter-active-class="duration-200" leave-active-class="duration-200"
              leave-from-class="opacity-100" leave-to-class="opacity-0">
    <slot></slot>
  </transition>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>