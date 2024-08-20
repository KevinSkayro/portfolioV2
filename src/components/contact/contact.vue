<template>
    <section id="contact">
        <div class="section-container">
            <h2>CONTACT</h2>
            <div class="contact-inner-container">
                <!-- Social Media Links -->
                <div class="social-menu">
                    <ul>
                        <li v-for="(socialLink, index) in socialLinks" :key="index">
                            <a :href="socialLink.href">
                                <font-awesome-icon :icon="socialLink.icon" />
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- Contact Form -->
                <form class="contact-form" @submit.prevent="sendEmail">
                    <div class="inputs" v-if="formSubmitted === false">
                        <div>
                            <label for="name">Name:</label>
                            <input type="text" id="name" v-model="form.name" required />
                        </div>
                        <div>
                            <label for="email">Email:</label>
                            <input type="email" id="email" v-model="form.email" required />
                        </div>
                        <div>
                            <label for="message">Message:</label>
                            <textarea id="message" v-model="form.message" required></textarea>
                        </div>
                        <div style="display: none;">
                            <label for="website">Website:</label>
                            <input type="text" id="website" v-model="form.website" />
                        </div>
                        <button type="submit">
                            <span v-if="formLoading === true" class="loader"></span>
                            <span v-else>Send</span>
                        </button>
                    </div>
                    <div class="sent-form" v-else>
                        <h3 class="success-message">Message has been sent successfully!</h3>
                        <div class="done"></div>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
import gsap from "gsap";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faFacebookF,
    faTwitter,
    faInstagram,
    faYoutube,
    faLinkedinIn,
    faGithubAlt,
} from "@fortawesome/free-brands-svg-icons";

library.add(faFacebookF, faTwitter, faInstagram, faYoutube, faLinkedinIn, faGithubAlt);

export default {
    components: {
        FontAwesomeIcon,
    },
    data() {
        return {
            form: {
                name: '',
                email: '',
                message: '',
                website: ''
            },
            formSubmitted: false,
            formLoading: false,
            socialLinks: [
                { href: "https://www.facebook.com/KevinSkayroJourney", icon: "fa-brands fa-facebook-f" },
                { href: "https://twitter.com/Kevinskayro", icon: "fa-brands fa-twitter" },
                { href: "https://www.instagram.com/kevinskayro_journey/", icon: "fa-brands fa-instagram" },
                { href: "https://www.youtube.com/channel/UC4SZMSA6juTx9aCCCsu-0iw", icon: "fa-brands fa-youtube" },
                { href: "https://www.linkedin.com/in/kevin-skayro/", icon: "fa-brands fa-linkedin-in" },
                { href: "https://github.com/KevinSkayro", icon: "fa-brands fa-github-alt" }
            ]
        };
    },
    methods: {
        sendEmail() {

            // if(this.form.name === '' || this.form.email === '' || this.form.message === '') {
            //     alert('Please fill out all fields');
            //     return;
            // }

            if (this.form.website !== '') {
                alert('are you a bot?' + this.form.website);
                return;
            }
            this.formLoading = true;
            fetch('https://kevinskayro.co/api/?action=contact_form_email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.form.name,
                    email: this.form.email,
                    message: this.form.message,
                    website: this.form.website
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    if (data.success) this.formSubmitted = true;
                    // Reset form
                    this.form.name = '';
                    this.form.email = '';
                    this.form.message = '';
                    this.formLoading = false;
                })




        }
    },
    mounted() {
        gsap.from("#contact h2", {
            duration: 1,
            x: -100,
            opacity: 0,
            stagger: 0.25,
        });

        gsap.from(".social-menu", {
            duration: 1,
            x: -100,
            opacity: 0,
            delay: 0.25,
            stagger: 0.25,
        });
    },
};
</script>

<style lang="scss" scoped>
@import '@src/components/contact/contact.scss';
</style>
