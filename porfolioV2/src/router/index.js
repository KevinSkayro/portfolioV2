import { createRouter, createWebHistory } from "vue-router"
import Home from "@src/components/home/home.vue"
import Projects from "@src/components/projects.vue"

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Home",
            component: Home,
        },
        {
            path: "/projects",
            name: "Projects",
            component: Projects,
        },
    ],
})
export default router