<template>
  <div v-if="userData != null">
    <p>{{ userData.userName }}</p>
    <p>{{ userData.lastName }}</p>
    <p>{{ userData.firstName }}</p>
    <p>{{ userData.patronymic }}</p>
    <p>{{ userData.email }}</p>
    <p>{{ userData.dateOfBirth }}</p>
    <p>{{ userData.dateOfRegistration }}</p>
    <button @click="LogOut">
      Log out
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "MainWindow.vue",
  data() {
    return {
      userData: null
    }
  },
  methods: {
    async isAuthorize() {
      if (localStorage.getItem("accessToken") === null) {
        return false;
      }

      if (new Date(Date.now()) > new Date(localStorage.getItem("tokenExpireData") * 1000)) {
        return this.tryRefreshToken();
      }

      try {
        await this.getUserData();
      } catch (error) {
        return this.tryRefreshToken();
      }
      return true;
    },
    async tryRefreshToken() {
      try {
        const url = `https://localhost:7143/api/Token/refresh?jwtToken=${localStorage.getItem("accessToken")}&resreshToken=${localStorage.getItem("refreshToken")}`;
        const {data} = await axios.get(url);
        localStorage.setItem("accessToken", data.value.accessToken)
        localStorage.setItem("refreshToken", data.value.refreshToken)
        await this.getUserData();
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async getUserData() {
      const config = {
        headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}
      };

      const url = `https://localhost:7143/api/User/${localStorage.getItem("userId")}`;
      const {data} = await axios.get(url, config);
      console.log(data);
      this.userData = data.value;
    },

    async LogOut() {
      console.log("logout");
      localStorage.clear();
      await this.$router.push('/login');
    }
  },
  async mounted() {
    if (await this.isAuthorize()) {
      console.log(this.userData);
    } else {
      //await router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>