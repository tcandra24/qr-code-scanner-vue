import { createRouter, createWebHistory } from "vue-router";

const = routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/auth/Register.vue"),
  },
  {
    path: "/group",
    name: "group.index",
    component: () => import("../views/auth/Register.vue"),
  },
  {
    path: "/group/:slug",
    name: "group.show",
    component: () => import("../views/auth/Register.vue"),
  },
  {
    path: "/setting",
    name: "setting",
    component: () => import("../views/auth/Register.vue"),
  },
]

const router = createRouter({
  history: createWebHistory,
  routes
})

export default routes