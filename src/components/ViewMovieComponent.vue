<template>
  <div class="container">
    <router-link :to="movieUrl">
      <img :src="imagePath" class="image" width="100%" height="100%">
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
    movieUrl: String
  },

  methods: {

  },
}
</script>

<style scoped>
.container{
  background: none;
}

.image{
  width: 100%;
  height: 100%;
  transition: 0.5s;
}

.image:hover {
  transform: scale(1.1);
}
</style>