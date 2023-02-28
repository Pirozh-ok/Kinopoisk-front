<template>
  <div class="container">
    <Header class="header"/>
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
    <div class="not-movie" v-if="moviePath === null">
      <p>This movie can't be viewed on KinoPoisk yet</p>
    </div>
    <div class="player-movie" v-else-if="moviePath != null">
      <video preload="metadata" class="video" controls>
        <source :src=moviePath type="video/mp4">
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
      posterPath: null,
      moviePath: null
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
      this.moviePath = this.movieData.contents.find(content => content.type === 2).path;
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
  height: 100%;
  width: 99%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 0 auto;
  color: #dacfcf;
  padding-bottom: 1%;
  max-width: 1600px;
}

.header{

}

.content {
  padding: 0;
  width: 90%;
  height: 40%;
  display: flex;
  justify-content: space-between;
  margin: 11vh auto 2% auto;
}

.movie-poster {
  height: 80%;
  width: 30%;
  margin: auto auto;
}

.image {
  width: 80%;
  max-width: 80%;
  height: auto;
  border-radius: 5px;
  border: 1px solid #fff;
  box-shadow:0 0 20px #555;
}

.movie-info {
  height: 80%;
  width: 60%;
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  align-content: space-between;
}

.title {
  height: 15%;
  width: 90%;
  color: white;
  margin: 0 auto;
  margin-bottom: 3%;
  font-size: calc( (100vw - 30rem)/30 + 1rem);
}

.description{
  font-size: calc( (100vw - 50rem)/90 + 1rem);
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
  font-size: calc( (100vw - 50rem)/90 + 1rem);
  margin-bottom: 3%;
}

.about-movie-main-info{
  width: 60%;
  font-size: calc( (100vw - 30rem)/70);
}

.about-movie-main-info p{
  margin-bottom: 1%;
}

.about-movie-actors{
  width: 30%;
  font-size: calc( (100vw - 30rem)/70);
}

.not-movie{
  width: 100%;
  height: auto;
  font-size: calc( (100vw - 30rem)/30 + 1rem);
  text-align: center;
}

.player-movie{
  width: 60%;
  height: 30%;
  margin: 0 auto;
}

.video{
  height: auto;
  width: 100%;
  max-width: 100%;
}
</style>