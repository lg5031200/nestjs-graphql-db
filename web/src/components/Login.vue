<template>
  <section class="section">
    <div class="columns">
      <div class="column is-4 is-offset-4">
        <h2 class="title has-text-centered">Login</h2>

        <form method="POST" @submit.prevent="login">
          <!-- <div class="field">
            <label class="label">Username</label>

            <p class="control">
              <input type="text" class="input" v-model="username" />
            </p>
          </div> -->

          <div class="field">
            <label class="label">E-Mail Address</label>

            <p class="control">
              <input type="email" class="input" v-model="email" />
            </p>
          </div>

          <div class="field">
            <label class="label">Password</label>

            <p class="control">
              <input type="password" class="input" v-model="password" />
            </p>
          </div>

          <p class="control">
            <button class="button is-primary is-fullwidth is-uppercase">
              登入
            </button>
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import { LOGIN } from "@/constants/mutate";
import { onLogin } from "../vue-apollo";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      const loginData = {
        email: this.email,
        password: this.password,
      };
      const result = await this.$apollo
        .mutate({
          mutation: LOGIN,
          variables: {
            loginData,
          },
        })
        .then((response) => {
          if (response.data.login) {
            onLogin(
              this.$apollo.provider.defaultClient,
              response.data.login.token,
            );
            this.$router.push({ path: "home", query: { id: response.data.login.id } });
          }
        });
    },
  },
};
</script>
