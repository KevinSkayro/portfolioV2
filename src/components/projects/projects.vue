<template>

    <section id="projects">
        <div class="section-container">
            <h2>PROJECTS</h2>
            <div class="projects-inner-container">
                <template v-for="(project, index) in projects" :key="index">
                    <div :data-card-hover="'#card-' + project.id" class="project-card" :id="'card-' + project.id">
                        <div class="overlay"></div>
                        <button :data-popup-target="project.id" class="preview-btn" @click="openPopup">VIEW
                            PROJECT</button>
                        <div class="project-title"><span>{{ project.title }}</span></div>
                    </div>
                </template>
            </div>
        </div>
    </section>

    <div class="popups">

        <template v-for="(project, index) in projects" :key="index">
            <div class="popup" :id="'popup-' + project.id" v-bind:class="{ active: selectedPopup == project.id }">

                <div class="popup-content">
                    <div class="popup-content-container">
                        <div :class="'project-preview preview' + project.id">
                            <img :src="project.popupPreview" alt="" />
                        </div>
                        <div class="project-btns-container">
                            <div class="close-popup-container">
                                <font-awesome-icon icon="fa-solid fa-xmark" @click="closePopup()" />
                            </div>
                            <div class="btns-container">
                                <div class="popup-text-container">
                                    <span>{{ project.title }}</span>
                                    <p>Technologies used:</p>
                                    <ul>
                                        <li v-for="(technology, index) in project.technologies" :key="index">{{
                                            technology }}</li>
                                    </ul>
                                </div>
                                <a class="project-popup-btn btn-one" target="_blank" v-if="project.sourceCode"
                                    :href="project.sourceCode">View source code</a>
                                <a class="project-popup-btn btn-two" target="_blank" v-if="project.goToProject"
                                    :href="project.goToProject">Go to project</a>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </template>

        <div v-if="popupOverlay" class="popup-overlay" @click="closePopup()"></div>

    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
library.add(faXmark)

import gsap from 'gsap';

export default {
    mounted() {
        gsap.from('#projects h2', {
            duration: 1,
            x: -100,
            opacity: 0,
            stagger: 0.25
        })

        gsap.from('.project-card', {
            duration: 1,
            x: -100,
            opacity: 0,
            // delay: .25,
            stagger: 0.10
        })
    },
    components: {
        'font-awesome-icon': FontAwesomeIcon
    },
    data() {
        return {
            selectedPopup: null,
            popupOverlay: false,
            projects: [
                {
                    id: 1,
                    title: "Weather API App",
                    technologies: ["HTML", "CSS", "JavaScript", "API"],
                    cardPreview: "weather-app.gif",
                    popupPreview: "/src/images/weather-app.gif",
                    technologies: ["HTML", "CSS", "JavaScript", "API"],
                    sourceCode: "https://github.com/KevinSkayro/weather",
                    goToProject: "./weather/weather.html"
                },
                {
                    id: 2,
                    title: "TO-DO List App",
                    technologies: ["HTML", "CSS", "JavaScript"],
                    cardPreview: "todo-app.gif",
                    popupPreview: "/src/images/todo-app.gif",
                    technologies: ["HTML", "CSS", "JavaScript"],
                    sourceCode: "https://github.com/KevinSkayro/todo-list-seize",
                    goToProject: "./todo-list-seize/seize-time.html"
                },
                {
                    id: 3,
                    title: "PHP Login System",
                    technologies: ["HTML", "CSS", "JavaScript", "PHP", "mySQL"],
                    cardPreview: "login-app.gif",
                    popupPreview: "/src/images/login-app.gif",
                    technologies: ["HTML", "CSS", "JavaScript", "PHP", "mySQL"],
                    sourceCode: "https://github.com/KevinSkayro/php-login-system",
                }
            ]
        }
    },
    methods: {
        openPopup(e) {
            console.log(e.target);
            const popupTarget = e.target.getAttribute("data-popup-target");
            this.selectedPopup = popupTarget;
            this.popupOverlay = true;
        },
        closePopup() {
            this.selectedPopup = null;
            this.popupOverlay = false;
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@src/components/projects/projects.scss';
</style>