<template>
    <section id="projects">
        <div class="section-container">
            <h2>PROJECTS</h2>
            <div class="projects-inner-container">
                <template v-for="(project, index) in projects" :key="index">
                    <div :data-card-hover="'#card-' + project.id" class="project-card" :id="'card-' + project.id"
                        @click="useIsMobile ? openPopup(project.id) : null">
                        <div class="overlay"></div>
                        <button class="preview-btn" @click="openPopup(project.id)">VIEW
                            PROJECT</button>
                        <div class="project-title"><span>{{ project.title }}</span></div>
                    </div>
                </template>
            </div>
            <div class="popups">
                <template v-for="(project, index) in projects" :key="index">
                    <div class="popup" :id="'popup-' + project.id"
                        v-bind:class="{ active: selectedPopup == project.id }">
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
        </div>
    </section>
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
                    popupPreview: "/src/assets/weather-app.gif",
                    technologies: ["HTML", "CSS", "JavaScript", "API"],
                    sourceCode: "https://github.com/KevinSkayro/weather",
                    goToProject: "./weather/weather.html"
                },
                {
                    id: 2,
                    title: "TO-DO List App",
                    technologies: ["HTML", "CSS", "JavaScript"],
                    cardPreview: "todo-app.gif",
                    popupPreview: "/src/assets/todo-app.gif",
                    technologies: ["HTML", "CSS", "JavaScript"],
                    sourceCode: "https://github.com/KevinSkayro/todo-list-seize",
                    goToProject: "./todo-list-seize/seize-time.html"
                },
                {
                    id: 3,
                    title: "PHP Login System",
                    technologies: ["HTML", "CSS", "JavaScript", "PHP", "mySQL"],
                    cardPreview: "login-app.gif",
                    popupPreview: "/src/assets/login-app.gif",
                    technologies: ["HTML", "CSS", "JavaScript", "PHP", "mySQL"],
                    sourceCode: "https://github.com/KevinSkayro/php-login-system",
                }
            ]
        }
    },
    methods: {
        openPopup(id) {
            this.selectedPopup = id;
            this.popupOverlay = true;
        },
        closePopup() {
            this.selectedPopup = null;
            this.popupOverlay = false;
        },
        useIsMobile() {
            var check = false;
            (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        }
    },
}
</script>

<style lang="scss" scoped>
@import '@src/components/projects/projects.scss';
</style>