<template>
  <section class="section">
    <div class="columns">
      <div class="column is-4 is-offset-4" v-if="user">
        <h2 class="title">User Details</h2>
        <p>User: {{ user.username }}</p>
        <p>Email: {{ user.email }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import { ME } from "@/constants/query";

export default {
  name: "Home",
  data() {
    return {
      user: null,
    };
  },
  methods: {},
  apollo: {
    me: {
      query: ME,
      skip() {
        return !localStorage.getItem("apollo-token") && !this.$route.query.id;
      },
      result({ data }) {
        this.user = data.me;
        if (!this.$route.query.id && data.me) {
          this.$router.push({ path: "home", query: { id: data.me.id } });
        }
      },
    },
  },
};
</script>
