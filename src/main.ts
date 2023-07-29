import {createApp} from 'vue'
import App from './WeatherApp.vue'
import './style.css'
import {createPinia} from "pinia";

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
