<template>
  <div class="p-4 bg-gradient-to-t from-blue-500 to-blue-300 rounded-md max-w-[500px] relative">
    <div class="pb-10 text-white flex-col flex items-center justify-center">
      <div class="h-[100px]">
        <img v-if="weatherData?.weather[0].icon"
                 :src="`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`"
                  :alt="weatherData?.weather[0].description"
                 @click="fetchingData = true"></div>
      <h1 class="text-3xl flex items-center gap-2">{{ weatherData?.name ?? '--' }}
        <settings-dialog/>
        <reload-button :loading=fetchingData @click="fetchData()"/>
      </h1>
      <div class="text-6xl flex items-center gap-2">
        {{ weatherData?.main.temp }}°C
      </div>

      <div class="flex flex-col items-center">
        <p class="text-2xl">{{ weatherData?.weather[0].description }}</p>
      </div>

      <article class="flex gap-2 justify-between mt-4">
        <wind-info :value="weatherData?.wind"/>
        <humidity-info :value="weatherData?.main.humidity"/>
        <pressure-info :value="weatherData?.main.pressure"/>
      </article>
    </div>
    <slide-transition>
      <Notification v-if="errorMessage" :message="errorMessage" @close="errorMessage=''"/>
    </slide-transition>
  </div>
</template>
<script setup lang="ts">
import {ref, watchEffect} from "vue";
import {Coords, WeatherData} from "@/types";
import SettingsDialog from "@/components/SettingsDialog.vue";
import {useSettingsStore} from "@/storage/store";
import SlideTransition from "@/components/transitions/SlideTransition.vue";
import Notification from "@/components/NotificationPopup.vue";
import WindInfo from "@/components/WindInfo.vue";
import HumidityInfo from "@/components/HumidityInfo.vue";
import PressureInfo from "@/components/PressureInfo.vue";
import ReloadButton from "@/components/ui/ReloadButton.vue";

const locationStore = useSettingsStore()
const weatherData = ref<WeatherData>()
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
