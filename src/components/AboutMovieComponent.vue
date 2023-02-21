<template>
  <div class="container">
    <Header/>
    <div class="content" v-if="movieData != null">
      <div class="movie-poster">
        <img :src="posterPath" class="image" width="100%" height="100%">
      </div>
      <div class="movie-info">
        <div class="title">
          <p>{{ movieData.title }}</p>
        </div>
        <div class="description">
          <p>{{ movieData.description }}</p>
        </div>
        <div class="about-movie">
          <div class="about-movie-main-info">
            <p class="about-movie-header">About the film</p>
            <p> Premiere date: {{
                `${movieData.premiereDate.getDate()}
               ${movieData.premiereDate.toLocaleString('default', {month: 'long'})}
               ${movieData.premiereDate.getFullYear()}`
              }} </p>
            <p>Countries: {{ movieData.countries.map(x => x.name).join(', ') }}</p>
            <p>Genres: {{ movieData.genres.map(x => x.name).join(', ').toLowerCase() }}</p>
            <p>Budget: ${{ movieData.budgetInDollars.toLocaleString() }}</p>
            <p>World fees: ${{ movieData.worldFeesInDollars.toLocaleString() }}</p>
            <p>AgeCategory: {{ movieData.ageCategories.map(x => x.value).join(', ') }}</p>
            <p>Time: {{ movieData.durationInMinutes }} minutes</p>
          </div>
          <div class="about-movie-actors">
            <p class="about-movie-header">Starring:</p>
            <p>Chris evans</p>
            <p>Chris evasssssss</p>
            <p>Chris evans</p>
            <p>Chris evasssssss</p>
            <p>Chris evans</p>
          </div>
        </div>
      </div>
    </div>
    <div class="player-movie">
      <video class="video" controls>
        <source src="../assets/images/avengers.mp4" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./HeaderComponent.vue";

export default {
  name: "AboutMovieComponent",
  components: {Header},

  data() {
    return {
      movieData: null,
      posterPath: null
    }
  },

  async mounted() {
    const movieId = this.$route.params['id'];
    const url = `https://localhost:7143/api/movie/${movieId}`;

    try {
      const {data} = await axios.get(url);
      console.log(data);
      this.movieData = data.value;
      this.posterPath = this.movieData.contents.find(content => content.type === 0).path;
      this.movieData.premiereDate = new Date(this.movieData.premiereDate);
    } catch (error) {
      console.log(error);

      if (error.status == 404) {
        alert("not found");
      }
    }
  }
}
</script>

<style scoped>
body {
  background: url("../assets/images/background-gif2.gif");
}

.container {
  padding-top: 2%;
  height: 100%;
  width: 90%;
  display: block;
  margin: 0 auto;
  color: #dacfcf;
  padding-bottom: 1%;
}

.content {
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.movie-poster {
  height: 80%;
  width: 30%;
  margin-left: 5%;
  margin-top: 5%;
}

.image {
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 30px;
}

.movie-info {
  height: 80%;
  width: 60%;
  margin-top: 3%;
}

.title {
  height: 15%;
  width: 90%;
  color: white;
  margin: 0 auto;
  font-size: 7vh
}

.description{
  font-size: 2vh;
  margin-bottom: 3%;
}

.about-movie {
  display: flex;
  width: 90%;
  height: 50%;
  margin: 0 auto;
  justify-content: space-around;
}

.about-movie-header{
  font-size: 3vh;
  margin-bottom: 3%;
}

.about-movie-main-info{
  width: 60%;
  font-size: 2vh;
}

.about-movie-main-info p{
  margin-bottom: 1%;
}

.about-movie-actors{
  width: 30%;
  font-size: 2vh;
}

.player-movie{
  width: 100%;
  height: 70%;
}

.video{
  height: 100%;
  width: 100%
}
</style>