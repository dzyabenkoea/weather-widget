<template>
  <div class="absolute top-0 left-0 w-full min-h-full p-2">
    <div class="relative top-0 w-full">
      <div class="flex items-center justify-between gap-2 p-4 text-red-500 rounded-md bg-white/40 top-0 left-0 absolute w-full">
        <div class="flex items-center gap-2">
          <exclamation-circle-icon class="h-6"/>
          <p>{{ props.message }}</p>
        </div>
        <button @click="emits('close')">
          <x-mark-icon class="h-6 text-gray-400"/>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ExclamationCircleIcon, XMarkIcon} from "@heroicons/vue/24/outline";

const props = defineProps<{ message: string }>()
const emits = defineEmits<{(e:'close')}>()
</script>

<style scoped>

</style>