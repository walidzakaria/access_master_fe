<script setup></script>

<template>
  <router-view />
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters['users/isAuthenticated'];
    },
  },
  methods: {
    checkToken() {
      this.$store
        .dispatch('users/checkToken')
        .then((response) => {
          console.log(response);
          this.getInfo();
        });
    },
    async getInfo() {
      await this.$store.dispatch('users/retrieveUserData').then(() => {});
    },
  },
  created() {
    console.log('env', process.env.VUE_APP_ENV);
  },
  mounted() {
    this.checkToken();
  },
};
</script>
