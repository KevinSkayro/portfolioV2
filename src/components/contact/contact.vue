<template>
    <section id="contact">
        <div class="section-container">
            <h2>CONTACT</h2>
            <hr class="white-hr" />
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

                            <span
                            v-if="formLoading === true"
                            class="loader"></span>

                            <span
                            v-else
                            >Send</span>
                            
                        
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

<style lang="scss">
#contact {
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    overflow-y: scroll;
    padding: 2rem;
    height: 80vh;
}

.contact-inner-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1000px;
    margin-top: 0rem;
    flex-wrap: wrap;
    padding: 0 0 2rem 0;
}

.social-menu ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 2rem;
}

.social-menu ul li {
    list-style: none;
    margin: 0 10px;
}

.social-menu ul li a {
    color: #030303;
    font-size: 25px;
    line-height: 54px;
    transition: 0.5s;
}

.social-menu ul li a:hover {
    color: #ffffff;
}

.social-menu ul li a {
    position: relative;
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: white;
    text-align: center;
    transition: 0.5s;
}

.social-menu ul li a:hover {
    transform: translate(0, -10px);
}

.social-menu ul li:nth-child(1) a:hover {
    background-color: #4267b2;
}

.social-menu ul li:nth-child(2) a:hover {
    background-color: #1da1f2;
}

.social-menu ul li:nth-child(3) a:hover {
    background: radial-gradient(circle at 30% 107%,
            #fdf497 0%,
            #fdf497 5%,
            #fd5949 45%,
            #d6249f 60%,
            #285aeb 90%);
}

.social-menu ul li:nth-child(4) a:hover {
    background-color: #cd201f;
}

.social-menu ul li:nth-child(5) a:hover {
    background-color: #2867b2;
}

.social-menu ul li:nth-child(6) a:hover {
    background-color: #0cacf4;
}

.contact-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 400px;
    background: #f5f5f5;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    color: #333;
    min-height: 298px;
}

.inputs {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
}

.inputs div {
    display: flex;
    flex-direction: column;
}

.inputs label {
    margin-bottom: 0.5rem;
    color: #333;
}

.inputs input,
.inputs textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
}

.inputs textarea {
    resize: vertical;
}

.inputs button {
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    background-color: #333;
    color: white;
    cursor: pointer;
    font-size: 1rem;
}

.inputs button:hover {
    background-color: #555;
}

.sent-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    height: 100%;
    width: 100%;
    padding: 2rem 0
}

.success-message {
    font-size: 2rem;
    text-align: center;
}

.done {
    animation: appear .7s cubic-bezier(0.18, 0.89, 0.32, 1.28);
    background-color: #0a6;
    border-radius: 50%;
    height: 50px;
    position: relative;
    width: 50px;

    &:after,
    &:before {
        background-color: #fff;
        border-radius: 2px;
        content: '';
        left: calc(50% + 2px);
        position: absolute;
        top: calc(50% + 2px);
    }

    &:after {
        height: 5px;
        transform: rotate(-45deg) translateX(-1px);
        transform-origin: bottom left;
        width: 20px;
    }

    &:before {
        height: 5px;
        transform: rotate(-135deg);
        transform-origin: bottom left;
        width: 15px;
    }
}

@keyframes appear {
    0% {
        opacity: 0;
        transform: scale(1.5);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
}

.footer-links {
    text-decoration: none;
    color: #fff;
    text-align: center;
    line-height: 1.8rem;
}

.footer-links:hover {
    text-decoration: underline;
}

.loader {
    width: 1rem;
    height: 1rem;
    border: 3px solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    }

    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    } 
</style>
