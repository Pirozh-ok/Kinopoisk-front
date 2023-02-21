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
  width: 20%;
  color: #dacfcf;
  font-size: 400%;
  display: block;
  font-family: 'Roboto', sans-serif;
}

.header-userdata {
  width: 20%;
  height: 70%;
  display: flex;
  justify-content: space-between;
  margin: auto 0;
}

.header-userdata-text {
  margin: auto 0;
  width: 70%;
  display: block;
}

.header-userdata-btn {
  width: 20%;
  height: 100%;
  margin: auto 0;
}

.header-userdata-btn-color{
  height: 100%;
  background-color: white;
  /*background-image: url("../assets/images/user-profile.png");*/
  background-size: cover;
  border-radius: 30px;
  cursor: pointer;
}
</style>