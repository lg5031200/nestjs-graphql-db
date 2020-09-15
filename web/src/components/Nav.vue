<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img
          src="https://bulma.io/images/bulma-logo.png"
          width="112"
          height="28"
        />
      </router-link>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item">
          Home
        </a>

        <a class="navbar-item">
          Documentation
        </a>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">
            More
          </a>

          <div class="navbar-dropdown">
            <a class="navbar-item">
              About
            </a>
            <a class="navbar-item">
              Jobs
            </a>
            <a class="navbar-item">
              Contact
            </a>
            <hr class="navbar-divider" />
            <a class="navbar-item">
              Report an issue
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary" v-if="showLoginBtn">
              <strong @click="toLoginPage">Login</strong>
            </a>
            <a class="button is-light" v-if="me" @click="logout">
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { onLogout } from "../vue-apollo";
import { ME } from "@/constants/query";
import { LOGOUT } from "@/constants/mutate";

export default {
  name: "Nav",
  data() {
    return {};
  },
  computed: {
    showLoginBtn() {
      return !this.me && this.$route.name !== "Login";
    },
  },
  methods: {
    toLoginPage() {
      this.$router.push({ path: "/login" });
    },
    async logout() {
      const result = await this.$apollo
        .mutate({
          mutation: LOGOUT
        })
        .then((response) => {
          if (response.data.logout) {
            // onLogout(this.$apollo.provider.defaultClient);
            localStorage.removeItem("apollo-token");
            this.me = null;
            this.toLoginPage();
          }
        });
    },
  },
  apollo: {
    me: {
      query: ME,
      skip() {
        return !localStorage.getItem("apollo-token") && !this.$route.query.id;
      },
    },
  },
};
</script>
