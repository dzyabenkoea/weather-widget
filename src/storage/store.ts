import {defineStore} from "pinia";
import {ref, watch} from "vue";

export const useLocationStore = defineStore('settings', () => {

    const locations = ref([])
    const activeLocation = ref()

    watch([locations, activeLocation], () => {
        save()
    })

    function add(addedLocation) {
        const exists = locations.value.find(location => location.id === addedLocation.id) !== undefined
        if (!exists)
            locations.value.push(addedLocation)
    }

    function remove(removedLocation) {
        locations.value = locations.value.filter(location => location.id !== removedLocation.id)
    }

    function save() {
        const jsonData = {activeLocation: activeLocation.value, locations: locations.value}
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
            activeLocation.value = settings.activeLocation ?? null
            locations.value = settings.locations ?? []
        }
    }

    load()

    return {locations, activeLocation, add, remove}

})
