<template>
  <ul class="bg-white py-1 px-2 rounded-md border">
    <li v-if="!settingsStore.locations.length" :key="null"
        class="px-2 py-4 flex flex-col items-center justify-between">
      <inbox-icon class="text-gray-400 h-8"/>
      <p class="text-gray-400">Add your first location</p>
    </li>
    <draggable v-model="settingsStore.locations" class="divide-y" item-key="id"
               @change="()=>{console.log(settingsStore.defaultLocation)}">
      <template #item="{element}">
        <li :key="element.id" class="py-1 flex items-center justify-between hover:cursor-move">
          <div class="flex items-center">
            <ellipsis-vertical-icon class="h-5 text-gray-400"/>
            <p>
              {{ element.city }}
              <span class="text-gray-400">({{ element.lat }},{{ element.lat }})</span> <span
                v-if="element === settingsStore.defaultLocation" class="text-gray-400">default</span></p>
          </div>
          <remove-button @click="onLocationRemove(element)"/>
        </li>
      </template>
    </draggable>
  </ul>
</template>

<script setup lang="ts">
import {useSettingsStore} from "@/storage/store";
import draggable from "vuedraggable";
import RemoveButton from "@/components/ui/RemoveButton.vue";
import {EllipsisVerticalIcon, InboxIcon} from "@heroicons/vue/24/outline";

const settingsStore = useSettingsStore()

function onLocationRemove(removedLocation) {
  settingsStore.remove(removedLocation)
}

</script>

<style scoped>

</style>