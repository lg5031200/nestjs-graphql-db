import Vue from "vue";
import { createProvider } from "./vue-apollo";

import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  apolloProvider: createProvider(),
  render: (h) => h(App),
  router
}).$mount("#app");

