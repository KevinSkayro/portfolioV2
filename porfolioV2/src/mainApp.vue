<script setup>
import { defineAsyncComponent } from 'vue';
import Header from '@src/components/header.vue';
const About = defineAsyncComponent(() => import('@src/components/about.vue'));
const Tech = defineAsyncComponent(() => import('@src/components/tech.vue'));
const Projects = defineAsyncComponent(() => import('@src/components/projects.vue'));
const Contact = defineAsyncComponent(() => import('@src/components/contact.vue'));
</script>
<template>
    <div class="main-container">
        <Header />
        <main>
            <About />
            <Tech />
            <Projects />
            <Contact />
        </main>
    </div>

</template>

<style scoped>
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
