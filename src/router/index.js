import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/weather",
            name: "weather",
            alias: '/',
            component: () => import("../pages/weather"),
        },
        {
            path: "/favorites",
            name: "favorites",
            alias: '/best',
            component: () => import("../pages/favorites"),
        },
        {
            path: '/error',
            name: 'error',
            component: () => import("../pages/error"),
        },
        {
            path: '/not-found',
            name: 'not-found',
            component: () => import("../pages/not-found"),
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: '/not-found'
        }
    ],
    linkActiveClass: "active",
    linkExactPathActiveClass: "active-test",
});

export default router;
