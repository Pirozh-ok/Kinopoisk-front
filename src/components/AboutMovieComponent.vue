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
            <p><span style="font-weight: bold">Countries:</span> {{ movieData.countries.map(x => x.name).join(', ') }}
            </p>
            <p><span style="font-weight: bold">Genres:</span>
              {{ movieData.genres.map(x => x.name).join(', ').toLowerCase() }}</p>
            <p><span style="font-weight: bold">Budget:</span> ${{ movieData.budgetInDollars.toLocaleString() }}</p>
            <p><span style="font-weight: bold">World fees:</span> ${{ movieData.worldFeesInDollars.toLocaleString() }}
            </p>
            <p><span style="font-weight: bold">AgeCategory:</span>
              {{ movieData.ageCategories.map(x => x.value).join(', ') }}</p>
            <p><span style="font-weight: bold">Time:</span> {{ movieData.durationInMinutes }} minutes</p>
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
        <li class="user-comment-show" v-if="isCommentedByUser">
          <view-comment
              :username="userName + ' (you)'"
              :rating="userRating"
              :comment="userComment"
              :updateDate="moment(new Date(userCommentUpdatedDate)).format('DD MMMM YYYY, HH:mm')"
          />
        </li>
        <div class="user-comment-entry" v-else>
          <p class="user-comment-entry-message">
            You haven't rated the movie yet. You can leave a comment right now!
          </p>
          <div class="comment-action-users">
            <div class="star-rating">
              <div class="star-rating__wrap">
                <input class="star-rating__input fa" id="star-rating-5" type="radio" name="rating" value="5"
                       title="5 out of 5 stars" @change="handleClick5Stars">
                <input class="star-rating__input fa" id="star-rating-4" type="radio" name="rating" value="4"
                       title="4 out of 5 stars" @change="handleClick4Stars">
                <input class="star-rating__input fa" id="star-rating-3" type="radio" name="rating" value="3"
                       title="3 out of 5 stars" @change="handleClick3Stars">
                <input class="star-rating__input fa" id="star-rating-2" type="radio" name="rating" value="2"
                       title="2 out of 5 stars" @change="handleClick2Stars">
                <input class="star-rating__input fa" id="star-rating-1" type="radio" name="rating" value="1"
                       title="1 out of 5 stars" @change="handleClick1Stars">
              </div>
            </div>

            <input
                type="text"
                placeholder="Enter you comment..."
                class="input-text-comment"
                v-model="userComment"
            >

            <button
                type="button"
                @click="handleClickCommentButton"
                class="comment-button">
              Comment
            </button>
          </div>
        </div>
        <div v-show="!notRatings">
          <div class="comments-head-text">
            <p>Comments from other KinoPoisk users:</p>
          </div>
          <li v-for="comment in ratings">
            <view-comment
                :username=comment.userName
                :comment=comment.comment
                :rating=comment.movieRating
                :updateDate="moment(new Date(comment.updateDate)).format('DD MMMM YYYY, HH:mm')"
            />
          </li>
        </div>
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
import moment from "moment";

export default {
  name: "AboutMovieComponent",
  components: {ViewCommentComponent, Header, ViewComment},

  computed: {
    notRatings() {
      return this.ratings == null || this.ratings.length < 1
    }
  },

  data() {
    return {
      movieData: null,
      posterPath: null,
      moviePath: null,
      ratings: null,
      isCommentedByUser: false,
      userRating: null,
      userComment: "",
      userCommentUpdatedDate: null,
      userName: localStorage.getItem("userName"),
      skip: 0,
      take: 10,
      moment: function (date) {
        return moment(date);
      }
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

          if (data.value.userRating != null) {
            this.isCommentedByUser = true;
            this.userRating = data.value.userRating.movieRating;
            this.userComment = data.value.userRating.comment;
            this.userCommentUpdatedDate = data.value.userRating.updateDate;
          }
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

  methods: {
    moment() {
      return moment
    },
    handleClick5Stars() {
      this.userRating = 5;
    },
    handleClick4Stars() {
      this.userRating = 4;
    },
    handleClick3Stars() {
      this.userRating = 3;
    },
    handleClick2Stars() {
      this.userRating = 2;
    },
    handleClick1Stars() {
      this.userRating = 1;
    },


    async handleClickCommentButton() {
      if (this.userComment && this.userComment.length > 0 && this.userComment.length < 200) {
        try {
          const url = "https://localhost:7143/api/movie/rate-movie";
          const config = {
            headers: {Authorization: `Bearer ${localStorage.getItem("accessToken")}`},
          };

          const body = {
            userId: localStorage.getItem("userId"),
            movieId: this.movieData.id,
            comment: this.userComment,
            movieRating: this.userRating
          }

          if (body.movieRating == null) {
            alert("The rating for the film is obligatory");
            return;
          }

          console.log(body)
          const {data} = await axios.post(url, body, config);
          console.log(data);
          this.userName = localStorage.getItem('userName');
          this.isCommentedByUser = true;
          this.userCommentUpdatedDate = Date.now();
        } catch (error) {
          console.log(error);
          alert("Couldn't comment on the movie, try again later");
        }
      }
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

.header {

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
  box-shadow: 0 0 20px #555;
}

.movie-info {
  height: 80%;
  width: 60%;
  display: flex;
  flex-direction: column;
  align-content: space-between;
}

.nameProperty {
  font-weight: bold;
}

.title {
  height: 15%;
  width: 90%;
  color: white;
  margin: 0 auto;
  margin-bottom: 3%;
  font-size: calc(2vw + 2vh);
}

.description {
  font-size: calc(0.5vh + 1vw);
  margin-bottom: 3%;
}

.about-movie {
  display: flex;
  width: 90%;
  height: 50%;
  margin: 0 auto;
  justify-content: space-around;
}

.about-movie-header {
  font-size: calc(1vh + 1.5vw);
  margin-bottom: 3%;
}

.about-movie-main-info {
  width: 60%;
  font-size: calc(0.5vh + 1vw);;
}

.about-movie-main-info p {
  margin-bottom: 1%;
}

.about-movie-actors {
  width: 30%;
  font-size: calc(0.5vh + 1vw);
}

.not-movie {
  width: 100%;
  height: auto;
  font-size: calc(2vh + 2vw);
  text-align: center;
}

.player-movie {
  width: 60%;
  height: 30%;
  margin: 0 auto 2% auto;
}

.video {
  height: auto;
  width: 100%;
  max-width: 100%;
}

.ratings {
  display: flex;
  flex-direction: column;
  width: 90%;
  background-color: #dedcdc;
  border-radius: 10px;
  list-style-type: none;
  margin: 0 auto;
}

.head-text-ratings {
  width: 40%;
  text-align: center;
  color: black;
  font-weight: bold;
  font-size: calc(1.5vh + 1.5vw);
  margin-bottom: 10px;
}

.comments {
  list-style: none;
}

.user-comment-entry {
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 0 auto 2% auto;
}

.user-comment-entry-message {
  font-size: 20px;
  color: black;
  width: 80%;
  margin: 0 auto 2% auto;
}

.comment-action-users {
  display: flex;
  flex-direction: row;
}

.input-rating {
  width: 5%;
  height: auto;
  font-size: 20px;
  text-align: center;
}

.input-text-comment {
  font-size: calc(1vh + 0.5vw);
  height: 4vh;
  width: 70%;
  padding-left: 10px;
  border-radius: 20px;
  margin-right: 2%;
}

.comment-action-users button {
  width: 10%;
  height: 3vh;
  margin: auto 0;
  font-size: calc(1vh + 0.5vw);
  border-radius: 20px;
  background-color: #111114;
  color: #ffffff;
}

.comments-head-text {
  font-weight: bolder;
  font-size: 20px;
  color: black;
  width: 60%;
  margin: 0 auto 1% auto;
}

.star-rating {
  height: 100%;
  margin: auto 1% auto 0;
}

.star-rating__wrap {
  display: inline-block;
  font-size: 1rem;
}

.star-rating__wrap:after {
  content: "";
  display: table;
  clear: both;
}

.star-rating__input {
  float: right;
  position: relative;
  width: 0;
  height: 0;
  margin: 0 20px 20px 0;
  cursor: pointer;
}

.star-rating__input:before {
  content: "\f006";
  color: #FFB300;
  font-size: 20px;
  width: 1 wh+1vw;
  height: 1 wh+1vw;
  line-height: 20px;
  position: absolute;
  left: 0;
  top: 0;
}

.star-rating__input:hover:before,
.star-rating__input:hover ~ .star-rating__input:before {
  content: "\f005";
  color: #e3ae2a;
}

.star-rating__input:checked:before,
.star-rating__input:checked ~ .star-rating__input:before {
  content: "\f005";
  color: #FFB300 !important;
}
</style>