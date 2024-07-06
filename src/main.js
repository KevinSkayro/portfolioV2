import { createApp } from 'vue'
import App from './mainApp.vue'
import router from '@src/router/index.js'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .mount('#app')
