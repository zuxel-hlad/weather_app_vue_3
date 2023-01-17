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
    ],
    linkActiveClass: "active",
    linkExactPathActiveClass: "active-test",
});

export default router;
