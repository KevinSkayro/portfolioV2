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
    setTimeout(() => {
        delay.value = true;
    }, 2000); // 2000 milliseconds = 2 seconds
});
</script>