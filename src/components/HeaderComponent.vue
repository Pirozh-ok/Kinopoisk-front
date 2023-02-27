<template>
  <div class="header">
    <div class="header-text">
      <p>KinoPoisk</p>
    </div>
    <div class="header-search-block">
      <input type="text" placeholder="&#128269 Search movie">
    </div>
    <div class="header-userdata">
      <div class="header-userdata-text">
        <p>{{ userName }}</p>
        <p>{{ email }}</p>
      </div>
        <button class="header-userdata-btn" @click="handleClickUserInfo"/>
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
      isPressed: false
    }
  },

  methods: {
    handleClickUserInfo() {
      this.isPressed = !this.isPressed;
    },
    handleClickSeacrhMovie(){
      alert("go seacrh film")
    }
  }
}
</script>

<style scoped>

.header {
  background: #000000;
  /*height: calc(1vh * 10%);*/
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
  margin: auto 0;
  font-size: calc( (100vw - 40rem)/20 + 1rem);
}

.header-search-block{
  width: 30%;
  height: 60%;
  display: flex;
  justify-content: space-around;
  margin: auto 0;
  /*border-radius: 20px;*/
  /*border-color: #ffffff;*/
  /*border-style: groove;*/
}

.header-search-block input{
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

.header-search-block input:focus
{
  outline: none;
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
  font-size: 100%;
}

.header-userdata-btn{
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