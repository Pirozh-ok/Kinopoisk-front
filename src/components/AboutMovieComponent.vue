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
<!--            v-for="actor in movie.actors"-->
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
    <div class="ratings">
      <p class="head-text-ratings">Movie ratings</p>
      <ul class="comments">
        <li class="user-comment-show" v-if="userRating != null">
          <view-comment
            :username="localStorage.getItem('username')"
            :rating="userRating.movieRating"
            :comment="userRating.comment"
          />
        </li>
        <div class="user-comment-entry" v-else>
          <p class="user-comment-entry-message">
            You haven't rated the movie yet. You can leave a comment right now!
          </p>
          <div class="comment-action-users">
            <input
                type="number"
                value="5"
                max="5"
                min="1"
                title="Enter you rating for movie"
                step="1"
                required
                class="input-rating"
            >
            <input
                type="text"
                placeholder="Enter you comment..."
                class="input-text-comment"
            >
            <button
            @click="handleClickCommentButton">
              Сomment
            </button>
          </div>
        </div>
        <div class="comments-head-text">
          <p>Comments from other KinoPoisk users:</p>
        </div>
        <li v-for="comment in ratings">
          <view-comment
            username="name"
            :comment= comment.comment
            :rating=comment.movieRating
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./HeaderComponent.vue";
import ViewComment from "@/components/ViewCommentComponent.vue";
import {isAuthorize} from "@/auth.js";
import ViewCommentComponent from "@/components/ViewCommentComponent.vue";
// import { Carousel, Slide } from 'vue-carousel';

export default {
  name: "AboutMovieComponent",
  components: {ViewCommentComponent, Header, ViewComment},

  data() {
    return {
      movieData: null,
      posterPath: null,
      moviePath: null,
      ratings: null,
      userRating: null,
      skip: 0,
      take: 2
    }
  },

  async mounted() {
    if (await isAuthorize()) {
      const movieId = this.$route.params['id'];
      const url = `https://localhost:7143/api/movie/${movieId}`;

      try {
        const {data} = await axios.get(url);
        console.log(data);
        this.movieData = data.value;
        this.posterPath = this.movieData.contents.find(content => content.type === 0).path;
        this.moviePath = this.movieData.contents.find(content => content.type === 2).path;
        this.movieData.premiereDate = new Date(this.movieData.premiereDate);

        try {
          const config = {
            headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`}
          };
          const ratingsUrl = `https://localhost:7143/api/movie/${movieId}/ratings?skip=${this.skip}&take=${this.take}`
          const {data} = await axios.get(ratingsUrl, config);
          console.log(data);

          this.userRating = data.value.userRating;
          this.ratings = data.value.ratings;

        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);

        if (error.status == 404) {
          alert("not found");
        }
      }
    } else {
      await this.$router.push({name: "login-page"})
    }
  },

  methods:{
    async handleClickCommentButton(){
      alert("send")
    }
  }
}
</script>

<style scoped>
body {
  background-color: #111114;
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
  background-color: #111114;
}

.header{

}

.content {
  padding: 0;
  width: 90%;
  height: 40%;
  display: flex;
  justify-content: space-between;
  margin: 5vh auto 2% auto;
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
  font-size: calc( (100vw - 50rem)/25 + 1rem);
  margin-bottom: 3%;
}

.about-movie-main-info{
  width: 60%;
  font-size: calc( (100vw - 40rem)/40);
}

.about-movie-main-info p{
  margin-bottom: 1%;
}

.about-movie-actors{
  width: 30%;
  font-size: calc( (100vw - 40rem)/40);
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
  margin: 0 auto 2% auto;
}

.video{
  height: auto;
  width: 100%;
  max-width: 100%;
}

.ratings{
  display: flex;
  flex-direction: column;
  width: 90%;
  background-color: #dedcdc;
  border-radius: 10px;
  list-style-type: none;
  margin: 0 auto;
}

.head-text-ratings{
  width: 30%;
  text-align: center;
  color: black;
  font-size: calc( (100vw - 30rem)/30 + 1rem);
  margin-bottom: 10px;
}

.comments{
  list-style: none;
}

.user-comment-entry{
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 0 auto 2% auto;
}

.user-comment-entry-message{
  font-size: 20px;
  color: black;
  width: 80%;
  margin: 0 auto 2% auto;
}

.comment-action-users{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.input-rating{
  width: 5%;
  height: auto;
  font-size: 20px;
  text-align: center;
}

.input-text-comment{
  font-size: 20px;
  height: 50px;
  width: 70%;
  padding-left: 10px;
}

.comment-action-users button{
  width: 20%;
  height: 30px;
  margin: auto 0;
}

.comments-head-text{
  font-size: 20px;
  color: black;
  width: 60%;
  margin: 0 auto 1% auto;
}

</style>