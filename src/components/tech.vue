<template>
    <section id="tech">
        <div class="section-container">

            <h2>TECHNOLOGIES</h2>
            <hr class="white-hr" />

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

<style lang="scss">
:root {
    --user-button-circle: rgba(0, 0, 0, 0.025);
    --user-button-cardborder: rgba(255, 255, 255, 0.25);
    --user-button-text: #323133;
    --user-button-shadow: rgba(0, 0, 0, 0.1);
}

.section-container {
    width: 1000px;
}

@mixin dark {
    &.dark {
        @content;
    }

    @media (prefers-color-scheme: dark) {
        &:not(.light) {
            @content;
        }
    }
}

$optionDefaultColours: #41B883,
    #61DBFB,
    #F05340,
    #FF9900,
    #00758F,
    #00749C,
    #AC92EC;

body {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    height: 100vh;
    font-family: 'Roboto', sans-serif;
    transition: .25s;

    .options {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        overflow: hidden;
        min-width: 600px;
        max-width: 900px;
        width: calc(100% - 100px);
        height: 400px;
        margin: 1rem;

        @for $i from 1 through 4 {
            @media screen and (max-width:798px - $i*80) {
                min-width: 600px - $i*80;

                .option:nth-child(#{6-$i}) {
                    display: none;
                }
            }
        }

        .option {
            position: relative;
            overflow: hidden;
            min-width: 60px;
            margin: 10px;
            background: var(--optionBackground, var(--defaultBackground, #E6E9ED));
            background-size: auto 120%;
            background-position: center;
            cursor: pointer;
            transition: .5s cubic-bezier(0.05, 0.61, 0.41, 0.95);

            @for $i from 1 through length($optionDefaultColours) {
                &:nth-child(#{$i}) {
                    --defaultBackground:#{nth($optionDefaultColours, $i)};
                }
            }

            &.active {
                flex-grow: 10000;
                transform: scale(1);
                max-width: 600px;
                margin: 0px;
                border-radius: 40px;
                background-size: auto 100%;

                .shadow {
                    box-shadow: inset 0 -120px 120px -120px black, inset 0 -120px 120px -100px black;
                }

                .label {
                    bottom: 20px;
                    left: 20px;

                    .info>div {
                        left: 0px;
                        opacity: 1;
                    }
                }
            }

            &:not(.active) {
                flex-grow: 1;
                border-radius: 30px;

                .shadow {
                    bottom: -40px;
                    box-shadow: inset 0 -120px 0px -120px black, inset 0 -120px 0px -100px black;
                }

                .label {
                    bottom: 10px;
                    left: 10px;

                    .info>div {
                        left: 20px;
                        opacity: 0;
                    }
                }
            }

            .shadow {
                position: absolute;
                bottom: 0px;
                left: 0px;
                right: 0px;
                height: 120px;
                transition: .5s cubic-bezier(0.05, 0.61, 0.41, 0.95);
            }

            .label {
                display: flex;
                position: absolute;
                right: 0px;
                height: 40px;
                transition: .5s cubic-bezier(0.05, 0.61, 0.41, 0.95);

                .icon {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    min-width: 40px;
                    max-width: 40px;
                    height: 40px;
                    border-radius: 100%;
                    background-color: white;
                    color: var(--defaultBackground);
                }

                .info {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    margin-left: 10px;
                    color: white;
                    white-space: pre;

                    >div {
                        position: relative;
                        transition: .5s cubic-bezier(0.05, 0.61, 0.41, 0.95), opacity .5s ease-out;
                    }

                    .main {
                        font-weight: bold;
                        font-size: 1.2rem;
                    }

                    .sub {
                        transition-delay: .1s;
                    }
                }
            }
        }
    }
}
</style>