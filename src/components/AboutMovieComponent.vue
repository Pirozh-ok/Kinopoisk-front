<template>
  <div class="container">
    <Header/>
  </div>
</template>

<script>
import axios from "axios";
import Header from "./HeaderComponent.vue";

export default {
  name: "AboutMovieComponent",
  components: {Header},

  async mounted() {
    const movieId = this.$route.params['id'];
    const url = `https://localhost:7143/api/movie/${movieId}`;

    try{
      const {data} = await axios.get(url);
      console.log(data);
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
.text{
  color: white;
}
</style>