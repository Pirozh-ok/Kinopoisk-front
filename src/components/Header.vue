<template>
  <div class="header-text">
    <p>KinoPoisk</p>
  </div>
  <div class = "header-userdata" v-if="userData != null">
    <div class="header-userdata-text">
      <p>{{userName}}</p>
      <p>{{email}}</p>
    </div>
    <button class="header-userdata-btn">

    </button>
  </div>
</template>

<script>
export default {
  name: "Header",

  props: {
    userName: String,
    email: String
  },

  data(){
    return {
      text: "KinoPoisk"
    }
  }
}
</script>

<style scoped>
.header{
  background: #000000;
  height: 10%;
  width: 96%;
  display: flex;
  justify-content: space-between;
  color: #dacfcf;
  margin: 0 auto;
}

.header-text{
  padding-top: 1%;
  width: 20%;
  color: #dacfcf;
  font-size: 400%;
  display: block;
}

.header-userdata{
  width: 20%;
  height: 70%;
  display: flex;
  justify-content: space-between;
  margin: auto 0;
}

.header-userdata-text{
  margin: auto 0;
}

.header-userdata-btn{
  width: 50px;
  height: 50px;
  margin-top: 1%;
  background: url("../assets/images/user-profile.png");
}
</style>