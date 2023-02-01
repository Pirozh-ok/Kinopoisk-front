<template>
  <div class="main"> <p>компонент {{word}}}</p> </div>
</template>

<script>
export default {
  name: "Test",
  data(){
    return{
      word: 'something'
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
  color: black;
}
</style>