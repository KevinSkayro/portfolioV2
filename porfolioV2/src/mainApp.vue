<script setup>
import { RouterLink, RouterView } from 'vue-router';
import Menu from './components/menu/menu.vue';

</script>
<template>
    <div class="main-container">
        <RouterView />

        <Menu v-if="delay" />
    </div>

</template>
<script>
export default {
    components: {
        Menu
    },
    data() {
        return {
            delay: false
        }
    },
    mounted() {
        setTimeout(() => {
            this.delay = true
        }, 500);
    }
};
</script>