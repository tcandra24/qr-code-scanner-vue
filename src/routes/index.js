import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../view/home/Index.vue"),
  },
  {
    path: "/group",
    name: "group.index",
    component: () => import("../view/group/Index.vue"),
  },
  {
    path: "/group/:slug",
    name: "group.show",
    component: () => import("../view/group/Show.vue"),
  },
  {
    path: "/generator",
    name: "generator.index",
    component: () => import("../view/generator/Index.vue"),
  },
  {
    path: "/setting",
    name: "setting.index",
    component: () => import("../view/setting/Index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
