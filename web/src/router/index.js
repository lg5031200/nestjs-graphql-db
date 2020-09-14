import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/components/Home";
import Login from "@/components/Login";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
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
  ],
});
