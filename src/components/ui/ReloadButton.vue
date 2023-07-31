<template>
  <button>
    <arrow-path-icon class="h-6 text-white transition-transform"
                     :class="{'animate-spin': props.loading, 'hover:rotate-45': !props.loading}"/>
  </button>
</template>

<script setup lang="ts">
import {ArrowPathIcon} from "@heroicons/vue/24/outline";
const props = defineProps<{loading?:boolean}>()
</script>

<style scoped>

</style>