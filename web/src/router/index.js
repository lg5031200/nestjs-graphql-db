import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/components/Home";
import Login from "@/components/Login";

Vue.use(VueRouter);

export const routes = [
  {
    name: "Root",
    path: "/",
    component: Home,
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
  },
  {
    name: "Home",
    path: "/home",
    component: Home,
  },
  { path: '*', redirect: '/' }
]

/**
 * CreateRouter - Function to create Vue router.
 *
 * @returns {Object}  Description.
 */
export function createRouter() {
  return new VueRouter({
    mode: 'history',
    routes: routes
  });
}
