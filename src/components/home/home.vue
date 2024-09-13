<template>
    <section class="hero_container">
        <div class="fullscreen_wrap">
            <video autoplay muted loop class="video_container">
                <source src="@src/assets/synthwave.mp4" type="video/mp4">
            </video>
        </div>
        <div class="hero_content">
            <h1 class="header_text">Hi, I'm Kevin</h1>
            <h1 class="header_text">I'm a Front-end Developer</h1>
            <h2 class="header_subtext">I build websites and web applications.</h2>
            <RouterLink to="/projects" class="explore_btn">
                SEE PROJECTS <font-awesome-icon icon="fa-solid fa-arrow-right" />
            </RouterLink>
        </div>
    </section>
</template>

<script>

import { useIsMobile } from '@src/composables/generalMethods.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import gsap from 'gsap';


library.add(faArrowRight)

export default {
    created: () => {
        if (!useIsMobile()) {
            console.log('desktop');
        } else {
            console.log('mobile');
        }



    },
    mounted() {
        // slide in animate text on load
        gsap.from('.header_text', {
            duration: 1,
            x: -100,
            opacity: 0,
            stagger: 0.25
        })
        gsap.from('.header_subtext', {
            duration: 1,
            x: -100,
            opacity: 0,
            delay: .5
        })
        gsap.from('.explore_btn', {
            duration: 1,
            x: -100,
            opacity: 0,
            delay: .75
        })
    },
    components: {
        'font-awesome-icon': FontAwesomeIcon
    }
}
</script>

<style lang="scss" scoped>
@import "@src/components/home/home.scss";
</style>