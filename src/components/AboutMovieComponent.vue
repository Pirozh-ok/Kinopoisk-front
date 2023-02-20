<template>
  <div class="container">
    <Header/>
    <div class="content" v-if="movieData != null">
      <div class="movie-poster">
        <img :src="posterPath" class="image" width="100%" height="100%">
      </div>
      <div class="movie-info">
        <div class="title">
          <p>{{movieData.title}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./HeaderComponent.vue";

export default {
  name: "AboutMovieComponent",
  components: {Header},

  data(){
    return{
      movieData: null,
      posterPath: null
    }
  },

  async mounted() {
    const movieId = this.$route.params['id'];
    const url = `https://localhost:7143/api/movie/${movieId}`;

    try{
      const {data} = await axios.get(url);
      console.log(data);
      this.movieData = data.value;
      this.posterPath = this.movieData.contents.find(content => content.type === 0).path;
    }
    catch (error){
      console.log(error);

      if(error.status == 404){
        alert("not found");
      }
    }
  }
}
</script>

<style scoped>
.container{
  padding-top: 2%;
  height: 90%;
  width: 90%;
  display: block;
  margin: 0 auto;
  color: #dacfcf;
}

.content{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.movie-poster{
  height: 80%;
  width: 30%;
  margin-left: 5%;
  margin-top: 5%;
}

.image{
  width: 100%;
  height: 100%;
  border-radius: 30px;
}

.movie-info{
  height: 80%;
  width: 50%;
  margin-top: 5%;
}

.title{
  height: 20%;
  width: 90%;
  color: white;
  margin: 0 auto;
  font-size: 7vh
}
</style>