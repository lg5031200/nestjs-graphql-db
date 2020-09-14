<template>
  <div id="app">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import { onLogout } from "./vue-apollo";
import NavBar from "@/components/Nav";

export default {
  name: "app",
  components: {
    'navbar': NavBar
  },
  methods: {
    async logout() {
      onLogout(this.$apollo.provider.defaultClient);
      this.$router.push({ path: "login" });
    },
  }
};
</script>
