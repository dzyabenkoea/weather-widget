<template>
  <!--  <LoadingAnimation/>-->
  <div class="p-4 bg-gradient-to-t from-blue-500 to-blue-300 rounded-md">
    <div class="pb-10 text-white flex-col flex items-center justify-center">
      <img :src="`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`">
      <h1 class="text-3xl flex items-center gap-2">Tyumen <settings-dialog/></h1>
      <div class="text-6xl flex items-center gap-2">
        {{ weatherData?.main.temp }}°C
      </div>

      <div class="flex flex-col items-center">
        <!--        <img :src="`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`">-->
        <p class="text-2xl">{{ weatherData?.weather[0].description }}</p></div>

      <article class="flex gap-2 justify-between mt-4">
        <section
            class="flex flex-col items-center grow gap-1 border border-white/40 shadow-md shadow-white/10 p-2 rounded-md min-w-[100px]">
          <h1>wind</h1>
          <hr class="w-full border-white/40">
          <div class="flex flex-col items-center">
            <span class="font-semibold text-3xl">{{ windDirection }}</span>
            <span class="text-1xl pt-1">{{ weatherData?.wind.speed }} m/s</span>
          </div>
        </section>
        <section
            class="flex flex-col items-center justify-center grow gap-2 border border-white/40 shadow-md shadow-white/10 p-2 rounded-md min-w-[100px]">
          <h1>humidity</h1>
          <hr class="w-full border-white/40">
          <div class="flex items-center">
            <span class="font-semibold text-3xl">{{ weatherData?.main.humidity }}%</span>
          </div>
        </section>
        <section
            class="backdrop-blur flex flex-col items-center justify-center grow gap-2 border border-white/40 shadow-md shadow-white/10 p-2 rounded-md min-w-[100px]">
          <h1>pressure</h1>
          <hr class="w-full border-white/40">
          <div class="flex items-center">
            <span class="font-semibold text-3xl">{{ weatherData?.main.pressure }}</span>
          </div>
        </section>
      </article>
    </div>
  </div>
</template>
<script setup lang="ts">
import weatherMockData from "@/assets/response";
import {computed, ref} from "vue";
import {WeatherData} from "@/types";
import {Dialog, DialogOverlay, DialogPanel} from "@headlessui/vue";
import SettingsDialog from "@/components/SettingsDialog.vue";
import SlideVertical from "@/components/transitions/SlideTransition.vue";

// const displayTemperature = ref('C')
const location = ref()
// const units = ref('metric')

location.value = {lon: '57.1522', lat: '65.5272'}
const weatherData = ref<WeatherData>()
const windDirection = computed(() => {
  const windDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  if (weatherData.value === undefined)
    return '-'
  const degreesInSection = 360 / windDirections.length
  const section = Math.floor(weatherData.value?.wind.deg / degreesInSection)
  return windDirections[section]
})

function fetchData() {
  weatherData.value = weatherMockData
}

// async function requestWeather(coords: any, units = 'metric') {
//   const API_KEY = '761673671f456dbb6eacfb3c95ae9bfb'
//   const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=${units}&appid=${API_KEY}`)
//   if (response.ok) {
//     return await response.json()
//   }
//   return null
// }

fetchData()


</script>
