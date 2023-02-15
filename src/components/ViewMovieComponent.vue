<template>
  <div class="container">
      <img :src="imagePath" class="image" width="100%" height="100%">
  </div>
</template>

<script>

export default {
  name: "ViewMovieComponent",
  props:{
    movieId: String,
    movieTitle: String,
    imagePath: String
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
}
</style>