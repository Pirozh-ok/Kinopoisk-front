<template>
  <div class="container" v-if="movies != null">
    <div class="header">
      <div class="header-text">
        <p>KinoPoisk</p>
      </div>
      <div class = "header-userdata" v-if="userData != null">
        <div class="header-userdata-text">
          <p>{{userData.userName}}</p>
          <p>{{userData.email}}</p>
        </div>
        <button class="header-userdata-btn">

        </button>
      </div>
    </div>
    <div class="content" v-if="movies != null">
<!--      <video autoplay loop muted class="bgvideo">-->
<!--        <source src="../assets/images/background-video.mp4" type="video/mp4">-->
<!--      </video>-->
      <ul class="dashboard-movies">
        <li v-for="movie in movies" :key="movie.id" class="movie">
          <ViewMovieComponent
              :id="movie.id"
              :movieTitle="movie.title"
              :imagePath="movie.imagePath"
              :movieUrl="movieUrl">
          </ViewMovieComponent>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ViewMovieComponent from "@/components/ViewMovieComponent.vue";
import VideoBg from 'vue-videobg'

export default {
  name: "MainWindow.vue",
  components: {ViewMovieComponent, VideoBg},
  data() {
    return {
      userData: null,
      movies: null,
      movieUrl: "/test"
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

      //gets list movies
      const url = `https://localhost:7143/api/movie/dashboard`;
      try{
        const {data} = await axios.get(url);
        console.log("load films")
        console.log(data);
        this.movies = data.value;
      }
      catch (error){
        console.log(error)
      }
    } else {
      await this.$router.push('/login')
    }
  }
}
</script>

<style>
@import '../assets/css/mainpage.css';
</style>