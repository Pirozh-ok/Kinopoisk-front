<template>
  <div class="container" v-if="movies != null || userData != null">
    <Header/>
    <div class="content" v-if="movies != null">
      <ul class="dashboard-movies">
        <li v-for="movie in movies" :key="movie.id" class="movie">
          <ViewMovieComponent
              :movieId="movie.id"
              :movieTitle="movie.title"
              :imagePath="movie.imagePath">
          </ViewMovieComponent>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ViewMovieComponent from "@/components/ViewMovieComponent.vue";
import Header from "@/components/HeaderComponent.vue";
import {isAuthorize} from "@/auth.js";
import {useQuery} from "vue-query";

export default {
  name: "MainWindow.vue",
  components: {ViewMovieComponent, Header},
  data() {
    return {
      movies: null,
    }
  },
  methods: {
    async LogOut() {
      console.log("logout");
      localStorage.clear();
      await this.$router.push('/login');
    }
  },

  async mounted() {
    if (await isAuthorize()) {
      //get list movies
      const url = `https://localhost:7143/api/movie/dashboard`;
      try{
        const {data} = await axios.get(url);
        this.movies = data.value;
      }
      catch (error){
        console.log(error)
      }
    } else {
      await this.$router.push({name: "login-page"})
    }
  }
}
</script>

<style>
@import '../assets/css/mainpage.css';
</style>