<template>
  <div class="header">
    <div class="header-text">
      <p>KinoPoisk</p>
    </div>
    <div class="header-userdata">
      <div class="header-userdata-text">
        <p>{{ userName }}</p>
        <p>{{ email }}</p>
      </div>
      <div class="header-userdata-btn">
        <button class="header-userdata-btn-color" @click="handleClickUserInfo"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",

  data() {
    return {
      text: "KinoPoisk",
      userName: localStorage.getItem("userName"),
      email: localStorage.getItem("email"),
    }
  },

  methods: {
    handleClickUserInfo() {
      alert("userInfo");
    }
  }
}
</script>

<style scoped>

.header {
  background: #000000;
  height: 10%;
  width: 96%;
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
  padding-top: 1%;
  color: #dacfcf;
  font-size: 70px;
  display: block;
  font-family: 'Roboto', sans-serif;
  width: 30%;
  margin: auto 0;
}
@media (max-width:1280px){
  .header-text{
    font-size: 60px;
  }
}
@media (max-width:1200px){
  .header-text{
    font-size: 50px;
  }
}
@media (max-width:700px){
  .header-text{
    font-size: 40px;
  }
}
@media (max-width:450px){
  .header-text{
    font-size: 30px;
  }
}


.header-userdata {
  width: 30%;
  display: flex;
  justify-content: space-between;
  margin: auto 0;
  position: relative;
  right: 0;
  top: 0;
}

.header-userdata-text {
  margin: auto 0;
  width: 70%;
  display: block;
}


.header-userdata-btn {
  width: 20%;
  margin: auto 0;
}

.header-userdata-btn-color{
  height: 4vw;
  width: 4vw;
  background-image: url("../assets/images/user-profile.png");
  background-size: cover;
  border-radius: 4vh;
  cursor: pointer;
}
</style>