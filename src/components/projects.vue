<template>

    <section id="projects">
        <div class="section-container">
            <h2>PROJECTS</h2>
            <hr />
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

<style lang="scss">
#projects {
    overflow-y: scroll;
}

.section-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 0 6rem 0;
}

.projects-inner-container {
    width: 1000px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.project-card {
    position: relative;
    width: 300px;
    height: 350px;
    margin: 1rem;
    border-radius: 1rem;
    -webkit-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    -moz-box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
    overflow: hidden;
}

#card-1 {
    background: url(../images/weather-app-preview.gif) bottom left/100% no-repeat;
}

#card-2 {
    background: url(../images/todo-app-preview.gif) top left/100% no-repeat;
}

#card-3 {
    background: url(../images/login-app-preview.gif) top left/100% no-repeat;
}

.project-card:hover {
    cursor: pointer;
}

.project-card:hover .preview-btn,
.touch-card .preview-btn {
    opacity: 1;
    transform: translateY(calc(150px - 1.5rem)) scale(1);
}

.project-card:before,
.project-card:after {
    content: "";
    position: absolute;
    z-index: -1;
    -webkit-box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    -moz-box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    -moz-border-radius: 100px / 10px;
    border-radius: 1rem;
}

.project-card:after {
    right: 10px;
    left: auto;
    -webkit-transform: skew(8deg) rotate(3deg);
    -moz-transform: skew(8deg) rotate(3deg);
    -ms-transform: skew(8deg) rotate(3deg);
    -o-transform: skew(8deg) rotate(3deg);
    transform: skew(8deg) rotate(3deg);
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    background: rgba(0, 0, 0, 0);
    transition: background 0.5s ease;
}

.project-card:hover .overlay,
.touch-card .overlay {
    display: block;
    background: rgba(0, 0, 0, 0.3);
}

.preview-btn {
    border: none;
    width: 8rem;
    height: 3rem;
    border-radius: 1.5rem;
    position: relative;
    opacity: 0;
    transition: 0.35s ease;
    transform: translateY(0) scale(0);
    left: calc(50% - 4rem);
}

.preview-btn:hover {
    cursor: pointer;
    background: #f21137;
}

.project-title {
    position: relative;
    bottom: calc(-300px + 3rem);
    right: 0;
    left: 0;
    height: 50px;
    background: var(--darkGrey);
    border-radius: 0 0 1rem 1rem;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

.project-title span {
    font-size: 1.3rem;
}

/*popup style start*/

.popup.active {
    opacity: 1;
    pointer-events: all;
    transform: translate(-50%, -50%) scale(1);
    -webkit-transform: translate(-50%, -50%) scale(1);
    -moz-transform: translate(-50%, -50%) scale(1);
    -o-transform: translate(-50%, -50%) scale(1);
}

.popup {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 1000px;
    max-width: 80%;
    background: #fff;
    border-radius: 1rem;
    pointer-events: none;
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
    -webkit-transform: translate(-50%, -50%) scale(0);
    -moz-transform: translate(-50%, -50%) scale(0);
    -o-transform: translate(-50%, -50%) scale(0);
    transition: 0.3s ease-in-out;
    z-index: 3;
}

.close-popup-container {
    /* padding: 0.5rem 1rem; */
    font-size: 1.5rem;
    text-align: end;
}

.fa-xmark:hover {
    cursor: pointer;
    color: #f21137;
}

.popup-overlay {
    position: fixed;
    /* opacity: 0; */
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.3);
    pointer-events: none;
    transform: scale(0);
    transition: 0.3s ease-in-out;
    z-index: 2;
}

.popup-overlay {
    pointer-events: all;
    transform: scale(1);
}

.popup-content {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.popup-content-container {
    width: 100%;
    height: 100%;
    display: flex;
}

.project-preview {
    width: 70%;
    border-radius: 1rem 0 0 1rem;
    overflow: hidden;
}

.preview-1 img,
.preview-2 img,
.preview-3 img {
    width: 100%;
}

.project-btns-container {
    width: 30%;
    border-radius: 0 1rem 1rem 0;
    padding: 0.8rem 1rem;
}

.btns-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: calc(100% - 24px);
    /* align-items: center; */
}

.popup-text-container {
    padding: 0.5rem 2rem;
}

.popup-text-container span {
    font-size: 1.2rem;
    font-weight: 600;
    display: block;
    margin-bottom: 1rem;
    text-align: center;
}

.popup-text-container p {
    margin-bottom: 0.5rem;
}

.popup-text-container li {
    line-height: 1.3rem;
}

.project-popup-btn {
    display: block;
    text-decoration: none;
    padding: 1rem;
    margin: 0 0 1rem 0;
    text-align: center;
    border-radius: 1rem;
    color: #fff;
    background: #f21137;
}

/*popup style end*/


@media screen and (max-width: 1280px) {
    .projects-inner-container {
        justify-content: center;
    }
}

@media screen and (max-width: 1100px) {
    .popup-content-container {
        flex-direction: column-reverse;
    }

    .project-preview {
        width: 100%;
        border-radius: 0 0 1rem 1rem;
    }

    .project-btns-container {
        width: 100%;
        border-radius: 1rem 1rem 0 0;
    }
}

@media screen and (max-width: 1000px) {
    .projects-inner-container {
        max-width: 80%;
    }
}

@media screen and (max-width: 900px) {
    .projects-inner-container {
        max-width: 90%;
    }
}

@media screen and (max-width: 500px) {
    .about-inner-container {
        max-width: 90%;
    }

    .contact-inner-container {
        max-width: 95%;
    }
}

@media screen and (max-width: 414px) {

    .section-container h2 {
        font-size: 2.5rem;
    }
}
</style>