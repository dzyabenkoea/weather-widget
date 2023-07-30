<template>
  <button class="px-2 py-1 transition-colors rounded-md"
          :class="{'bg-gray-300 text-gray-500':props.disabled,
                   'text-white bg-blue-500 hover:bg-blue-400':!props.disabled}"
          :disabled="props.disabled">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{ disabled?: boolean }>()
</script>

<style scoped>

</style>