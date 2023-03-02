<template>
  <div class="container" v-if="movies != null || userData != null">
    <Header class="header" ref="header"/>
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

export default {
  name: "MainWindow.vue",
  components: {ViewMovieComponent, Header},
  data() {
    return {
      movies: null,
    }
  },
  methods: {

  },

  async mounted() {
    if (await isAuthorize()) {
      //get list movies
      const url = `https://localhost:7143/api/movie/search?orderBy=premiereDate&take=20`;
      try{
        const {data} = await axios.get(url);
        this.movies = data.value.items;
        console.log(this.movies)
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

<style scoped>

.container{
  margin: 0 auto;
  width: 100%;
  max-width: 1600px;
  height: 100%;
  justify-content: center;
  display: flex;
  flex-direction: column;
}

.header{
  z-index: 999;
  position: fixed;
  top: 0;
  margin-bottom: 5%;
}

.content{
  height: 90%;
  width: 90%;
  display: flex;
  margin: 9vh auto;
}

.movie{
  display: block;
  width: auto;
  height: auto;
  max-width: 250px;
  max-height: 350px;
  min-height: 140px;
  min-width: 100px;
  margin: 2%;
  border-radius: 5px;
  border: 1px solid #fff;
  box-shadow:0 0 20px #555;
}

.movie ViewMovieComponent{
  height: 100%;
  width: 100%;
}

.dashboard-movies{
  width: 100%;
  height: 100%;
  display: flex;
  list-style-type: none;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>