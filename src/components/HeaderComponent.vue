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
  padding-top: 1%;
  width: 30%;
  color: #dacfcf;
  font-size: 5vw;
  display: block;
  font-family: 'Roboto', sans-serif;
  margin: auto 0;
}

.header-userdata {
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  margin: auto 0;
}

.header-userdata-text {
  margin: auto 0;
  width: 70%;
  display: block;
  font-size: 1vw;
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