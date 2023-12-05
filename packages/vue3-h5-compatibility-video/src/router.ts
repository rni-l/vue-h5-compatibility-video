/*
 * @Author: Lu
 * @Date: 2023-11-14 11:19:23
 * @LastEditTime: 2023-12-04 15:21:12
 * @LastEditors: Lu
 * @Description:
 */
import { createRouter, createWebHashHistory } from "vue-router";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/p1",
      component: () => import("./pages/p1.vue"),
    },
    {
      path: "/p2",
      component: () => import("./pages/p2.vue"),
    },
    {
      path: "/p3",
      component: () => import("./pages/p3.vue"),
    },
  ],
});
