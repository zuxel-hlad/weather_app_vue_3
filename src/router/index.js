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
    ],
    linkActiveClass: "active",
    linkExactPathActiveClass: "active-test",
});

export default router;
