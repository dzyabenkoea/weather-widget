<template>
  <div class="relative">
    <button @click="dialogOpen=true">
      <cog6-tooth-icon class="text-white h-6 transition-transform hover:rotate-45"/>
    </button>
    <HDialog id="" :open="dialogOpen" class="relative">
      <dialog-backdrop class="absolute top-0 bg-black/10 w-full min-h-full flex items-center justify-center" @click="dialogOpen=false">
        <dialog-panel v-if="dialogOpen" class="mt-2 p-5 flex flex-col gap-2 bg-white shadow-md rounded-md min-w-[75ch]">
          <div class="flex gap-2 justify-between">
            <h1 class="font-semibold text-xl">Settings</h1>
            <button @click="dialogOpen=false" class="p-1 rounded-full hover:bg-gray-50">
              <x-mark-icon class="h-5"/>
            </button>
          </div>
          <label for="apiKeyInput" class="text-gray-500">OpenWeather API key</label>
          <div class="border rounded-md flex gap-1 justify-between group-focus-visible:outline overflow-hidden">
            <input id="apiKeyInput" type="text" class="px-2 py-1 grow outline-none" v-model="apiKey">
            <appear-transition>
              <button v-if="apiKeyNeedsSaving" class="px-2 rounded bg-blue-500 m-1 text-white text-center"
                      @click="settingsStore.apiKey = apiKey">
                <span class="text-sm">save</span>
              </button>
            </appear-transition>
          </div>
          <h2 class="text-gray-500">Locations</h2>
          <location-list/>
          <location-selector v-if="newLocationIsOpen" class="w-full" @change="value => newLocation = value"/>
          <basic-button v-if="!newLocationIsOpen" @click="showNewLocationDialog()">Add location</basic-button>
          <div v-if="newLocationIsOpen" class="flex gap-2 w-full">
            <primary-button class="grow" @click="onSaveLocation" :disabled="!allowAdd">Add</primary-button>
            <secondary-button class="grow" @click="hideNewLocationDialog()">Cancel</secondary-button>
          </div>
        </dialog-panel>
      </dialog-backdrop>
    </HDialog>
  </div>
</template>

<script setup lang="ts">
import {Cog6ToothIcon} from "@heroicons/vue/24/outline";
import {computed, ref} from "vue";
import {Dialog as HDialog, DialogBackdrop, DialogPanel} from "@headlessui/vue";
import PrimaryButton from "@/components/ui/PrimaryButton.vue";
import LocationSelector from "@/components/LocationSelector.vue";
import SecondaryButton from "@/components/ui/SecondaryButton.vue";
import AppearTransition from "@/components/transitions/AppearTransition.vue";
import {useSettingsStore} from "@/storage/store";
import BasicButton from "@/components/ui/BasicButton.vue";
import {XMarkIcon} from "@heroicons/vue/24/outline";
import LocationList from "@/components/LocationList.vue";

const settingsStore = useSettingsStore()
const dialogOpen = ref(false)
const newLocationIsOpen = ref(false)
const newLocation = ref()
const allowAdd = computed(() => !!newLocation.value)
const apiKey = ref(settingsStore.apiKey)
const apiKeyNeedsSaving = computed(() => settingsStore.apiKey !== apiKey.value)

function hideNewLocationDialog() {
  newLocationIsOpen.value = false
  newLocation.value = null
}

function showNewLocationDialog() {
  newLocationIsOpen.value = true
}

function onSaveLocation() {
  settingsStore.add(newLocation.value)
}

</script>

<style scoped>

</style>