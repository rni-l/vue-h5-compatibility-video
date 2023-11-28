/*
 * @Author: Lu
 * @Date: 2023-11-14 11:19:23
 * @LastEditTime: 2023-11-27 17:37:33
 * @LastEditors: Lu
 * @Description:
 */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);
export const router = new VueRouter({
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
