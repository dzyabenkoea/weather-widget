<template>
  <div class="relative">
    <button @click="dialogOpen=true">
      <cog6-tooth-icon class="text-white h-6 transition-transform hover:rotate-45"/>
    </button>
    <Dialog :open="dialogOpen">
      <dialog-backdrop class="absolute top-0 bg-black/10 w-full min-h-full" @click="dialogOpen=false"/>
      <dialog-panel class="z-10 absolute mt-2 p-5 flex flex-col gap-2 bg-white shadow-md rounded-md  min-w-[75ch]">
        <h2 class="text-lg">Locations</h2>
        <ul class="divide-y bg-white p-1 rounded-md border">
          <li v-if="!settings.length" :key="null" class="px-2 py-4 flex flex-col items-center justify-between">
            <inbox-icon class="text-gray-400 h-8"/>
            <p class="text-gray-400">Add your first location</p>
          </li>
          <li :key="setting.id" v-for="setting in settings" class="px-2 py-1 flex items-center justify-between">
            <div class="flex">
              <p>{{ setting.city }} <span class="text-gray-400">({{ setting.lat }},{{ setting.lat }})</span></p>
            </div>
            <remove-button @click="onLocationRemove(setting)"/>
          </li>
        </ul>
        <location-selector v-if="newLocationIsOpen" class="w-full" @change="value => newLocation = value"/>
        <primary-button v-if="!newLocationIsOpen" @click="showNewLocationDialog()">Add location</primary-button>
        <div v-if="newLocationIsOpen" class="flex gap-2 w-full">
          <primary-button class="grow" @click="onSaveLocation" :disabled="!allowAdd">Add</primary-button>
          <secondary-button class="grow" @click="hideNewLocationDialog()">Cancel</secondary-button>
        </div>
      </dialog-panel>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import {Cog6ToothIcon} from "@heroicons/vue/24/outline";
import {computed, ref} from "vue";
import RemoveButton from "@/components/ui/RemoveButton.vue";
import {Dialog, DialogBackdrop, DialogPanel} from "@headlessui/vue";
import PrimaryButton from "@/components/ui/PrimaryButton.vue";
import LocationSelector from "@/components/LocationSelector.vue";
import SecondaryButton from "@/components/ui/SecondaryButton.vue";
import {InboxIcon} from "@heroicons/vue/24/outline";

const dialogOpen = ref(false)
const newLocationIsOpen = ref(false)

const settings = ref([])

const newLocation = ref()
const allowAdd = computed(() => !!newLocation.value)

function hideNewLocationDialog() {
  newLocationIsOpen.value = false
}

function showNewLocationDialog() {
  newLocationIsOpen.value = true
}

function onLocationRemove(removedLocation) {
  settings.value = settings.value.filter(location => location.id !== removedLocation.id)
}

function onSaveLocation() {
  const exists = settings.value.find(location => location.id === newLocation.value.id) !== undefined
  if (!exists)
    settings.value.push(newLocation.value)
}

</script>

<style scoped>

</style>