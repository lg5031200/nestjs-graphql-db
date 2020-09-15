import Vue from "vue";
import { createProvider } from "./vue-apollo";

import App from "./App.vue";
import { createRouter } from "./router";

Vue.config.productionTip = false;

const router = createRouter();

new Vue({
  apolloProvider: createProvider(),
  render: (h) => h(App),
  router
}).$mount("#app");

