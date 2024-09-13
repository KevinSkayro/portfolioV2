import { createRouter, createWebHistory } from "vue-router"
import Home from "@src/components/home/home.vue"
import Projects from "@src/components/projects/projects.vue"
import Tech from "@src/components/tech/tech.vue"
import Contact from "@src/components/contact/contact.vue"
import About from "@src/components/about/about.vue"
import NotFound from '@src/components/NotFound.vue';

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
        {
            path: "/tech",
            name: "Tech",
            component: Tech,
        },
        {
            path: "/contact",
            name: "Contact",
            component: Contact,
        },
        {
            path: "/about",
            name: "About",
            component: About,
        },
        {
            path: '/:pathMatch(.*)*', // Catch-all route for undefined paths
            name: 'NotFound',
            component: NotFound,
          },
    ],
})
export default router