import {defineStore} from "pinia";
import {computed, ref, watch} from "vue";
import {Location} from "@/types";

export const useSettingsStore = defineStore('settings', () => {

    const apiKey = ref('')
    const locations = ref<Location[]>([])
    const defaultLocation = computed<Location>(() => locations.value[0] ?? null)

    watch([locations, defaultLocation, apiKey], () => {
        save()
    }, {deep: true})

    function add(addedLocation) {
        const exists = locations.value.find(location => location.id === addedLocation.id) !== undefined
        if (!exists)
            locations.value.push(addedLocation)
    }

    function remove(removedLocation) {
        locations.value = locations.value.filter(location => location.id !== removedLocation.id)
    }

    function save() {
        const jsonData = {locations: locations.value, apiKey: apiKey.value}
        localStorage.setItem('weather-widget-settings', JSON.stringify(jsonData))
    }

    function load() {
        const getSettings = () => {
            const data = localStorage.getItem('weather-widget-settings')
            if (data === '')
                return null
            try {
                return JSON.parse(data)
            } catch (e) {
                return null
            }
        }
        const settings = getSettings()
        if (settings !== null) {
            locations.value = settings.locations ?? []
            apiKey.value = settings.apiKey ?? ''
        }
    }

    load()

    return {locations, defaultLocation, apiKey, add, remove}

})
