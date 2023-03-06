<template>
  <div class="header">
    <div class="header-text" @click="redirectToMainPage">
      <p>KinoPoisk</p>
    </div>
    <div class="header-search-block">
      <input type="text"
             placeholder="&#128269 Search movie"
             v-model="searchWord"
             @input="setFlag"/>
    </div>
    <div class="header-userdata">
      <div class="header-userdata-text">
        <p>{{ userName }}</p>
        <p>{{ email }}</p>
      </div>
      <button class="header-userdata-btn" @click="handleClickUserInfo"/>
    </div>
    <div id="search" class="search-result" v-show="searchWord != null && searchWord != ''">
      <ul class="foundMovies" v-if="!notFound">
        <li v-for="movie in foundMovies" :key="movie.id" class="view-movie" @click="redirectToAboutMovie(movie.id)">
            <img :src="movie.imagePath" alt="">
            <p>{{ movie.title }}</p>
        </li>
      </ul>
      <p v-else class="not-found">No movies found for your search</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import notFound from "@/components/NotFound.vue";
import LoginComponent from "@/components/LoginComponent.vue";

export default {
  name: "Header",

  data() {
    return {
      text: "KinoPoisk",
      userName: localStorage.getItem("userName"),
      email: localStorage.getItem("email"),
      searchWord: "",
      foundMovies: null,
      timer: null,
      notFound: false,
      isPressed: false
    }
  },

  methods: {
    handleClickOutsideSearchBlock(){
      console.log('work!')
    },

    async handleClickUserInfo() {
      await this.LogOut();
    },

    async setFlag() {
      this.foundMovies = null;

      if (this.searchWord === "") {
        return;
      }

      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(await this.timeOut, 500)
    },

    async timeOut() {
      await this.searchMovieForString()
      this.timer = null;
    },

    async searchMovieForString() {
      const url = `https://localhost:7143/api/movie/search?searchText=${this.searchWord}&take=10&orderBy=premiereDate&descOrder=true`
      //get list movies
      try {
        const {data} = await axios.get(url);
        this.foundMovies = data.value.items;
        this.notFound = !this.foundMovies.length > 0;
        console.log((this.notFound))
        console.log(this.foundMovies)
      } catch (error) {
        this.notFound = true;
        console.log(error)
      }
    },

    redirectToAboutMovie(key){
      console.log("aa")
      this.$router.push({name: "about-movie-page", params: {id:key}});
      setTimeout(()=> {location.reload()}, 500);
    },

    redirectToMainPage(){
      this.$router.push({name: "main-page"});
    },

    async LogOut() {
      console.log("logout");
      localStorage.clear();
      await this.$router.push('/login');
    }
  }
}
</script>

<style scoped>

.header {
  background: #000000;
  height: calc(10vh);
  width: 100%;
  max-width: 1600px;
  display: flex;
  justify-content: space-between;
  color: #dacfcf;
  margin: 0 auto;
  border-radius: 10px;
}

.header-text {
  position: relative;
  top: 0;
  left: 0;
  color: #dacfcf;
  display: block;
  font-family: 'Roboto', sans-serif;
  width: 30%;
  margin: auto 0 auto 2%;
  font-size: calc((100vw - 40rem) / 20 + 1rem);
  cursor: pointer;
}

.header-search-block {
  width: 30%;
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin: auto 0;
}

.header-search-block input {
  width: 90%;
  height: 80%;
  margin: auto 0;
  background-color: black;
  color: #dacfcf;
  border-radius: 20px;
  border: groove #dacfcf;
  outline: none;
  font-size: 2vh;
  padding-left: 15px;
}

.header-search-block input:focus {
  outline: none;
}

.search-result {
  width: 30vw;
  position: absolute;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 9vh;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border-radius: 10px;
  overflow-x: hidden;
}

.search-result::-webkit-scrollbar {
  width: 0;
}

.not-found{
  color: #000000;
  font-size: calc((100vw - 70rem) / 30 + 1rem);
  font-weight: 20px;
  text-align: center;
}

.foundMovies {
  display: flex;
  flex-direction: column;
  width: 95%;
  height: 95%;
  margin: auto auto;
}

.view-movie {
  display: inline-flex;
  flex-direction: row;
  width: 90%;
  margin: 1% auto;
  border: none;
  background-color: white;
  cursor: pointer;
}

.view-movie img {
  width: 6vh;
  height: 8vh;
  margin-right: 1vw;
}

.view-movie p {
  width: 70%;
  color: black;
  margin: auto auto;
  font-size: calc((100vw - 80rem) / 40 + 1rem);;
}

.header-userdata {
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  margin: auto 0;
  position: relative;
  right: 0;
  top: 0;
}

.header-userdata-text {
  margin: auto 0;
  width: 50%;
  display: block;
  /*font-size: calc((100vw - 50rem) / 50);*/
  font-size: calc(0.8vh + 0.8vw);
}

.header-userdata-btn {
  height: 4vw;
  width: 4vw;
  background-image: url("../assets/images/user-profile.png");
  background-size: cover;
  border-radius: 4vh;
  cursor: pointer;
  position: relative;
  right: 0;
  max-width: 100px;
  margin: auto 0;
}
</style>