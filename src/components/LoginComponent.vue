<template>
  <div class="form_auth_block">
    <div class="form_auth_block_image">
      <img src="../images/cam.png" width="250">
    </div>
    <div class="form_auth_block_content">
      <p class="form_auth_block_head_text">Authorization</p>
      <form class="form_auth_style">
        <input
            type="email"
            v-model.trim="form.email"
            name="auth_email"
            placeholder="Enter your email:">
        <input
            type="password"
            v-model.trim="form.password"
            name="auth_pass"
            placeholder="Enter password:">
        <button @click="getUser" class="form_auth_button" type="submit" name="form_auth_submit">Sign in</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.form_auth_block{
  width: 700px;
  height: 400px;
  margin: 0 auto;
  background-size: cover;
  border-radius: 4px;
  background: white;
  zoom: 150%
}
.form_auth_block_content{
  display: inline-block;
  padding-top: 7%;
  width: 60%;
}

.form_auth_block_image{
  display: inline-block;
  position:relative
}

.form_auth_block_head_text{
  display: block;
  text-align: center;
  padding: 10px;
  font-size: 50px;
  font-weight: 600;
  opacity: 0.7;
  color: black;
}
.form_auth_block label{
  display: block;
  text-align: center;
  padding: 10px;
  background: #ffffff;
  opacity: 0.7;
  font-weight: 600;
  margin-bottom: 10px;
  margin-top: 10px;
}
.form_auth_block input{
  display: block;
  margin: 20px auto;
  width: 80%;
  height: 45px;
  border-radius: 10px;
  outline: none;
  border-color: black;
}
input:focus {
  color: #000000;
  border-radius: 10px;
  border: 2px solid #436fea;
}
.form_auth_button{
  color : white;
  background: #242424;
  display: block;
  width: 20%;
  margin: 10% auto;
  border-radius: 10px;
  height: 35px;
  border-color: black;
  cursor: pointer;
}
::-webkit-input-placeholder {color:#3f3f44; padding-left: 10px;}
:-moz-placeholder{color:#3f3f44; padding-left: 10px;}
:-moz-placeholder{color:#3f3f44; padding-left: 10px;}
:-ms-input-placeholder      {color:#3f3f44; padding-left: 10px;}
</style>

<script>
import axios from "axios";

export default {
  name: "LoginComponent",
  data() {
      return {
        form: {
          email: '',
          password: ''
        },
        response: null
      }
  },
  methods: {
    getUser(){
      axios
          .get(`https://localhost:7143/api/Account/login?Email=${this.email}&Password=${this.password}`)
          .then(response => (this.response = response));
      console.log(this.response)
    }
  }
}
</script>

