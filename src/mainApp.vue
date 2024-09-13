<template>
    <div>
        <!-- Loading screen with dark background -->
        <div class="loading-screen" v-if="!delay">
            <div class="progress">
                <div class="progress-value"></div>
            </div>
        </div>

        <!-- Render content only when delay is true -->
        <div v-if="delay" class="main-container">
            <router-view></router-view>
            <Menu />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Menu from './components/menu/menu.vue';

const delay = ref(false);

onMounted(() => {
    const url = window.location.pathname;
    let delayTime = 0;
    switch (url) {
        case '/':
            delayTime = 2000;
            break;
        case '/projects':
        case '/tech':
        case '/about':
        case '/contact':
            delayTime = 1000;
            break;
        default:
            delayTime = 500;
            break;
    }

    setTimeout(() => {
        delay.value = true;
    }, delayTime);
});
</script>