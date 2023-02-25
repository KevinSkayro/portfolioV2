import { createApp } from 'vue'



import App from './mainApp.vue'
import router from '@src/router/index.js'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faDatabase } from '@fortawesome/free-solid-svg-icons'

import { faHtml5, faCss3Alt, faVuejs, faLaravel, faWordpress, faAws } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(faHtml5, faCss3Alt, faVuejs, faLaravel, faDatabase, faWordpress, faAws)


createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .mount('#app')
