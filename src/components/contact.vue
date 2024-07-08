<template>
    <section id="contact">
        <div class="section-container">
            <h2>CONTACT</h2>
            <hr class="white-hr" />
            <div class="contact-inner-container">
                <!-- Social Media Links -->
                <div class="social-menu">
                    <ul>
                        <li>
                            <a href="https://www.facebook.com/KevinSkayroJourney">
                                <font-awesome-icon icon="fa-brands fa-facebook-f" />
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com/Kevinskayro">
                                <font-awesome-icon icon="fa-brands fa-twitter" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/kevinskayro_journey/">
                                <font-awesome-icon icon="fa-brands fa-instagram" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.youtube.com/channel/UC4SZMSA6juTx9aCCCsu-0iw">
                                <font-awesome-icon icon="fa-brands fa-youtube" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/kevin-skayro/">
                                <font-awesome-icon icon="fa-brands fa-linkedin-in" />
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/KevinSkayro">
                                <font-awesome-icon icon="fa-brands fa-github-alt" />
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- Contact Form -->
                <form class="contact-form" @submit.prevent="sendEmail">
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
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
        <a target="_blank" class="footer-links" href="https://www.freepik.com/vectors/people">
            People vector in "about" section created by pikisuperstar - www.freepik.com
        </a>
        <a target="_blank" class="footer-links" href="https://github.com/KevinSkayro/portfolio2021">
            Portfolio's source code
        </a>
        <a target="_blank" class="footer-links" href="https://www.kevinskayro.com">
            Site by Kevin Castro
        </a>
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
                message: ''
            }
        };
    },
    methods: {
        sendEmail() {

            fetch('https://kevinskayro.co/api/?action=contact_form_email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.form.name,
                    email: this.form.email,
                    message: this.form.message
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                })
            // Reset form
            this.form.name = '';
            this.form.email = '';
            this.form.message = '';



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
    margin: 5rem 0 1rem 0;
    color: #fff;
}

.contact-inner-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1000px;
    margin-top: 2rem;
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
    line-height: 50px;
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
    gap: 1rem;
    width: 100%;
    max-width: 400px;
    background: #f5f5f5;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.contact-form div {
    display: flex;
    flex-direction: column;
}

.contact-form label {
    margin-bottom: 0.5rem;
    color: #333;
}

.contact-form input,
.contact-form textarea {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
}

.contact-form button {
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    background-color: #333;
    color: white;
    cursor: pointer;
    font-size: 1rem;
}

.contact-form button:hover {
    background-color: #555;
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
</style>
