<template>
  <button class="border px-2 py-1 transition-colors rounded-md"
          :class="{'bg-gray-100 text-gray-500':props.disabled,
                   'bg-white hover:bg-gray-100':!props.disabled}"
          :disabled="props.disabled">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ disabled?: boolean }>()
</script>

<style scoped>

</style>