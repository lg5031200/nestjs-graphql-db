import Vue from "vue";
import VueRouter from "vue-router";

import SignUp from "@/components/SignUp";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      name: "SignUp",
      path: "/signup",
      component: SignUp,
    },
  ],
});
