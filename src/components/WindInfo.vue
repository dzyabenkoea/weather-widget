<template>
  <section
      class="flex flex-col items-center grow gap-1 border border-white/40 shadow-md shadow-white/10 p-2 rounded-md min-w-[100px]">
    <h1>wind</h1>
    <hr class="w-full border-white/40">
    <div class="flex flex-col items-center">
      <span class="font-semibold text-3xl">{{ windDirection ?? '--' }}</span>
      <span class="text-1xl pt-1">{{ value?.speed ?? '--' }} m/s</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import {computed} from "vue";
import {Wind} from "@/types";

const props = defineProps<{ value: Wind }>()

const windDirection = computed(() => {
  const windDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  if (props.value === undefined)
    return '-'
  const degreesInSection = 360 / windDirections.length
  const section = Math.floor(props.value?.deg / degreesInSection)
  return windDirections[section]
})


</script>

<style scoped>

</style>