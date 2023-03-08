<template>
        <header class="hero-container">
            <div class="fullscreen-canvas-wrap">
                <canvas id="bg"></canvas>
            </div>
            <div class="hero-content">
                <h1 class="header-text">Hi, I'm Kevin</h1>
                <h1 class="header-text">I'm a Front-end Developer</h1>
                <h2 class="header-subtext">I build websites and web applications.</h2>
                <router-link to="/projects" class="explore-btn">
                    SEE PROJECTS <font-awesome-icon icon="fa-solid fa-arrow-right" />
                </router-link>
                <!-- <a data-goto-btn class="explore-btn" >
                    SEE PROJECTS <font-awesome-icon icon="fa-solid fa-arrow-right" />
                </a> -->
            </div>
      </header>
</template>

<script>
import { RouterLink } from 'vue-router';
import { useIsMobile } from '@src/composables/generalMethods.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
library.add(faArrowRight)

export default {
    created: () => {
        if(!useIsMobile()){
            import('@src/components/home/game.js')
        } else {
            console.log('mobile');
        }
    },
    components: {
        'font-awesome-icon': FontAwesomeIcon
    }
}
</script>

