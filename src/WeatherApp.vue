<template>
  <div class="p-4 bg-gradient-to-t from-blue-500 to-blue-300 rounded-md max-w-[500px] relative">
    <div class="pb-10 text-white flex-col flex items-center justify-center">
      <div class="h-[100px]">
        <img v-if="weatherData?.weather[0].icon"
                 :src="`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`"
                 @click="fetchingData = true"></div>
      <h1 class="text-3xl flex items-center gap-2">{{ weatherData?.name ?? '--' }}
        <settings-dialog/>
        <button @click="fetchData()">
          <arrow-path-icon class="h-6 text-white transition-transform"
                           :class="{'animate-spin': fetchingData, 'hover:rotate-45': !fetchingData}"/>
        </button>
      </h1>
      <div class="text-6xl flex items-center gap-2">
        {{ weatherData?.main.temp }}°C
      </div>

      <div class="flex flex-col items-center">
        <p class="text-2xl">{{ weatherData?.weather[0].description }}</p></div>

      <article class="flex gap-2 justify-between mt-4">
        <section
            class="flex flex-col items-center grow gap-1 border border-white/40 shadow-md shadow-white/10 p-2 rounded-md min-w-[100px]">
          <h1>wind</h1>
          <hr class="w-full border-white/40">
          <div class="flex flex-col items-center">
            <span class="font-semibold text-3xl">{{ windDirection ?? '--' }}</span>
            <span class="text-1xl pt-1">{{ weatherData?.wind.speed ?? '--' }} m/s</span>
          </div>
        </section>
        <section
            class="flex flex-col items-center justify-center grow gap-2 border border-white/40 shadow-md shadow-white/10 p-2 rounded-md min-w-[100px]">
          <h1>humidity</h1>
          <hr class="w-full border-white/40">
          <div class="flex items-center">
            <span class="font-semibold text-3xl">{{ weatherData?.main.humidity ?? '--' }} %</span>
          </div>
        </section>
        <section
            class="backdrop-blur flex flex-col items-center justify-center grow gap-2 border border-white/40 shadow-md shadow-white/10 p-2 rounded-md min-w-[100px]">
          <h1>pressure</h1>
          <hr class="w-full border-white/40">
          <div class="flex items-center">
            <span class="font-semibold text-3xl">{{ weatherData?.main.pressure ?? '--' }}</span>
          </div>
        </section>
      </article>
    </div>
    <slide-transition>
      <Notification v-if="errorMessage" :message="errorMessage" @close="errorMessage=''"/>
    </slide-transition>
  </div>
</template>
<script setup lang="ts">
import weatherMockData from "@/assets/response";
import {computed, ref, watchEffect} from "vue";
import {Coords, WeatherData} from "@/types";
import SettingsDialog from "@/components/SettingsDialog.vue";
import {useSettingsStore} from "@/storage/store";
import {ArrowPathIcon} from "@heroicons/vue/24/outline";
import SlideTransition from "@/components/transitions/SlideTransition.vue";
import Notification from "@/components/NotificationPopup.vue";

const locationStore = useSettingsStore()
const weatherData = ref<WeatherData>()
const windDirection = computed(() => {
  const windDirections = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  if (weatherData.value === undefined)
    return '-'
  const degreesInSection = 360 / windDirections.length
  const section = Math.floor(weatherData.value?.wind.deg / degreesInSection)
  return windDirections[section]
})
const fetchingData = ref(true)
const errorMessage = ref('')

async function fetchData() {

  fetchingData.value = true;

  const location = locationStore.defaultLocation
  if (location) {
    const response = await requestWeather({lat: location.lat, lon: location.lng})
    if (response !== null) {
      weatherData.value = response
    } else {
      showErrorNotification('Could not retrieve weather information')
    }
  } else {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const coords = {lat: position.coords.latitude, lon: position.coords.longitude}
      const response = await requestWeather(coords)
      if (response !== null) {
        weatherData.value = response
      } else {
        showErrorNotification('Could not retrieve weather information')
      }
    }, () => {
      showErrorNotification('Allow geolocation usage or set active location in settings')
    })
  }

  fetchingData.value = false;

}

async function requestWeather(coords: Coords) {

  const API_KEY = locationStore.apiKey
  if (!API_KEY) {
    showErrorNotification('Enter OpenWeather API key in settings')
    return null
  }

  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${API_KEY}`)
  if (response.ok) {
    return await response.json()
  }

  return null

}

function showErrorNotification(message: string) {
  console.error(message)

  errorMessage.value = message
  setTimeout(()=>{
    errorMessage.value = ''
  }, 5000)

}

watchEffect(() => {
  fetchData()
})

</script>
