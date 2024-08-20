<template>
    <section id="tech">
        <div class="section-container">

            <h2>TECHNOLOGIES</h2>


            <div class="options">
                <template v-for="(tech, index) in technologies" :key="index">
                    <div class="option" :class="{ 'active': activeCard === index }"
                        :style="'--optionBackground:url(' + tech.image + ');'" @click="selectCard(index)">
                        <div class="shadow"></div>
                        <div class="label">
                            <div class="icon">
                                <font-awesome-icon :icon="tech.icon" />
                            </div>
                            <div class="info">
                                <div class="main">{{ tech.name }}</div>
                                <div class="sub">{{ calculateExperienceTime(tech.expericeStart) }}</div>
                                <div v-show="tech.description" class="sub">
                                    {{ tech.description }}
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>
<script>

import gsap from 'gsap';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faDatabase } from '@fortawesome/free-solid-svg-icons'
import { faHtml5, faCss3Alt, faVuejs, faReact, faLaravel, faWordpress, faAws } from '@fortawesome/free-brands-svg-icons'

library.add(faHtml5, faCss3Alt, faVuejs, faReact, faLaravel, faDatabase, faWordpress, faAws)

export default {
    mounted: () => {
        gsap.from('#tech h2', {
            duration: 1,
            x: -100,
            opacity: 0,
            stagger: 0.25
        })

        gsap.from('.options', {
            duration: 1,
            x: -100,
            opacity: 0,
            delay: .25,
            stagger: 0.25
        })
    },
    data() {
        return {
            activeCard: 0,
            technologies: [
                {
                    name: 'Vue.js',
                    icon: 'fa-brands fa-vuejs',
                    image: 'https://kevinskayro.com/wp-content/uploads/2023/01/vue-1024x576.jpg',
                    expericeStart: new Date('2021-11-01')
                },
                {
                    name: 'React.js',
                    icon: 'fa-brands fa-react',
                    image: 'https://kevinskayro.com/wp-content/uploads/2024/06/react-1024x576.png',
                    expericeStart: new Date('2023-11-01'),
                    description: 'I have experience with React.js, specially with Next.js'
                },
                {
                    name: 'Laravel',
                    icon: 'fa-brands fa-laravel',
                    image: 'https://kevinskayro.com/wp-content/uploads/2023/05/laravel-1024x576.jpg',
                    expericeStart: new Date('2021-11-01')
                },
                {
                    name: 'AWS',
                    icon: 'fa-brands fa-aws',
                    image: 'https://kevinskayro.com/wp-content/uploads/2023/05/aws-1024x576.jpg',
                    expericeStart: new Date('2022-02-01')
                },
                {
                    name: 'mySQL',
                    icon: 'fa-solid fa-database',
                    image: 'https://kevinskayro.com/wp-content/uploads/2023/05/sql-1024x576.jpg',
                    expericeStart: new Date('2019-06-01')
                },
                {
                    name: 'Wordpress',
                    icon: 'fa-brands fa-wordpress',
                    image: 'https://66.media.tumblr.com/f19901f50b79604839ca761cd6d74748/tumblr_o65rohhkQL1qho82wo1_1280.jpg',
                    expericeStart: new Date('2012-04-05'),
                    description: "I've been working with Wordpress on and off for a long time."
                },
            ]
        }
    },
    methods: {
        selectCard(index) {
            this.activeCard = index
        },
        calculateExperienceTime(start) {
            const now = new Date();
            const diff = now - new Date(start);

            // Calculate years and months
            const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
            const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44)); // Average month length

            let result = '';

            if (years > 0) {
                result += `${years} year${years > 1 ? 's' : ''}`;
            }

            if (months > 0) {
                if (years > 0) result += ' and ';
                result += `${months} month${months > 1 ? 's' : ''}`;
            }

            result += ' of experience';

            return result;
        }
    }
}

</script>

<style lang="scss" scoped>
@import '@src/components/tech/tech.scss';
</style>