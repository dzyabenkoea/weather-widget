<template>
  <combobox as="div" class="relative" v-model="selectedCity" @update:model-value="emits('change', selectedCity)">
    <div class="flex items-center border rounded-md w-full justify-between overflow-hidden">
      <combobox-input ref="cityInput"
                      :display-value="(city) => city?.city || ''" type="text" class="grow px-2 py-1 outline-none"
                      @change="query = $event.target.value">
      </combobox-input>
      <appear-transition>
        <button v-show="!!query && !fetchingCities" class="absolute right-0 mr-2" @click="onClearCityInput">
          <x-mark-icon class="h-4"/>
        </button>
      </appear-transition>
      <appear-transition>
        <loading-animation class="h-4 px-2" v-show="fetchingCities"/>
      </appear-transition>
    </div>
    <slide-transition>
      <combobox-options v-if="cityList.length"
                        class="custom-scroll absolute mt-2 bg-white rounded-md p-2 shadow-md min-w-[50%] max-h-[10rem] overflow-auto">
        <combobox-option :key="city.id" v-for="city in cityList" as="template"
                         :value="city" v-slot="{active, selected}">
          <li class="px-2 py-1 cursor-pointer rounded-md truncate"
              :class="{'bg-gray-50': active && !selected, 'bg-blue-500 text-white': selected}"
              :title="city.city">
            {{ city.city }}
          </li>
        </combobox-option>
      </combobox-options>
    </slide-transition>
  </combobox>
</template>

<script lang="ts" setup>
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/vue";
import cities from '@/assets/worldcities.csv'
import {ref, watch} from "vue";
import SlideTransition from "@/components/transitions/SlideTransition.vue";
import LoadingAnimation from "@/components/LoadingAnimation.vue";
import AppearTransition from "@/components/transitions/AppearTransition.vue";
import {XMarkIcon} from "@heroicons/vue/24/outline";

// eslint-disable-next-line no-unused-vars
const emits = defineEmits<{ (e: 'change', value: { city: string }) }>()

const query = ref('')
const cityList = ref([])
const selectedCity = ref()
const fetchingCities = ref(false)
const cityInput = ref()

function onClearCityInput(){
  query.value = ''
  selectedCity.value = null
  cityInput.value.el.focus()
}

function applyCityFilter() {
  cityList.value = cities.filter(
      (city: { city: string }) => city.city.toLowerCase().includes(query.value.trim().toLowerCase()))
}

let timer = null
watch(query, () => {
  if (query.value.length > 3) {
    if (timer !== null) {
      clearTimeout(timer)
      fetchingCities.value = true
      timer = setTimeout(() => {
        applyCityFilter()
        fetchingCities.value = false
      }, 500)
    } else {
      fetchingCities.value = true
      timer = setTimeout(() => {
        applyCityFilter()
        fetchingCities.value = false
      }, 500)
    }
  } else {
    cityList.value = []
  }
})

</script>

<style scoped lang="scss">
.custom-scroll {
  ::-webkit-scrollbar {
    width: 1em;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  ::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
}
</style>