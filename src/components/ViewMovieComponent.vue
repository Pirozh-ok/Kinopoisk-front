<template>
  <div class="container">
    <router-link :to="aboutMovieUrl">
      <div class="image">
        <img :src="imagePath" class="view-image">
      </div>
      </router-link>
  </div>
</template>

<script>

export default {
  name: "ViewMovieComponent",
  props:{
    movieId: String,
    movieTitle: String,
    imagePath: String,
  },

  data(){
    return {
      aboutMovieUrl: `/movie/${this.movieId}`
    }
  },
}
</script>

<style scoped>
.container{
  background: none;
}

p{
  color: white;
}

.image{
  width: 100%;
  height: 100%;
  overflow:hidden;
}

.view-image{
  width: 100%;
  height: 100%;
  -moz-transition: all 1s ease-out;
  -o-transition: all 1s ease-out;
  -webkit-transition: all 1s ease-out;
  transition: all 1s ease-out;
}

.view-image:hover {
  -webkit-transform: scale(1.2);
  -moz-transform: scale(1.2);
  -o-transform: scale(1.2);
  transform: scale(1.2);
}
</style>