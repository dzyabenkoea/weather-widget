<template>
  <div class="relative">
    <button @click="dialogOpen=true">
      <cog6-tooth-icon class="text-white h-6 transition-transform hover:rotate-45"/>
    </button>
    <HDialog id="" :open="dialogOpen" class="relative">
      <dialog-backdrop class="absolute top-0 bg-black/10 w-full min-h-full flex items-center justify-center" @click="dialogOpen=false">
        <dialog-panel v-if="dialogOpen" class="mt-2 p-5 flex flex-col gap-2 bg-white shadow-md rounded-md min-w-[75ch]">
          <label for="apiKeyInput">OpenWeather API key</label>
          <div class="border rounded-md flex gap-1 justify-between group-focus-visible:outline overflow-hidden">
            <input id="apiKeyInput" type="text" class="px-2 py-1 grow outline-none" v-model="apiKey">
            <appear-transition>
              <button v-if="apiKey && apiKeyNeedsSaving" class="px-2 rounded bg-blue-500 m-1 text-white text-center"
                      @click="settingsStore.apiKey = apiKey">
                <span class="text-sm">save</span>
              </button>
            </appear-transition>
          </div>
          <h2 class="text-lg">Locations</h2>
          <ul class="divide-y bg-white p-1 rounded-md border">
            <li v-if="!settingsStore.locations.length" :key="null"
                class="px-2 py-4 flex flex-col items-center justify-between">
              <inbox-icon class="text-gray-400 h-8"/>
              <p class="text-gray-400">Add your first location</p>
            </li>
            <li :key="location.id" v-for="location in settingsStore.locations"
                class="px-2 py-1 flex items-center justify-between">
              <div class="flex">
                <p>{{ location.city }} <span class="text-gray-400">({{ location.lat }},{{ location.lat }})</span> <span
                    v-if="location === settingsStore.defaultLocation" class="text-gray-400">default</span></p>
              </div>
              <remove-button @click="onLocationRemove(location)"/>
            </li>
          </ul>
          <location-selector v-if="newLocationIsOpen" class="w-full" @change="value => newLocation = value"/>
          <basic-button v-if="!newLocationIsOpen" @click="showNewLocationDialog()">Add +</basic-button>
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
import {computed, onMounted, ref} from "vue";
import RemoveButton from "@/components/ui/RemoveButton.vue";
import {Dialog as HDialog, DialogBackdrop, DialogPanel, Popover, PopoverButton, PopoverPanel} from "@headlessui/vue";
import PrimaryButton from "@/components/ui/PrimaryButton.vue";
import LocationSelector from "@/components/LocationSelector.vue";
import SecondaryButton from "@/components/ui/SecondaryButton.vue";
import {InboxIcon} from "@heroicons/vue/24/outline";
import AppearTransition from "@/components/transitions/AppearTransition.vue";
import SlideTransition from "@/components/transitions/SlideTransition.vue";
import {useAuthStore, useSettingsStore} from "@/storage/store";
import BasicButton from "@/components/ui/BasicButton.vue";
import {CheckIcon} from "@heroicons/vue/24/outline";

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

function onLocationRemove(removedLocation) {
  settingsStore.remove(removedLocation)
}

function onSaveLocation() {
  settingsStore.add(newLocation.value)
}

</script>

<style scoped>

</style>