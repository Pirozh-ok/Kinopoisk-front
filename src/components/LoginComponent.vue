<template>
  <div class="form_auth_block">
    <div class="form_auth_block_image">
      <img src="../images/cam.png" width="250">
    </div>
    <div class="form_auth_block_content">
      <p class="form_auth_block_head_text">Authorization</p>
      <form class="form_auth_style"  @submit="checkForm">
        <input
            type="text"
            v-model.trim="form.email"
            name="auth_email"
            placeholder="Enter your email:">
        <p class="error-message" v-if = "this.v$.form.email.required.$invalid">
          Fields Email is required
        </p>
        <p class="error-message" v-if = "this.v$.form.email.email.$invalid">
          String not email
        </p>
        <p class="error-message" v-if = "this.form.email.length < this.minEmailLen">
          Less then {{minEmailLen}}
        </p>
        <p class="error-message" v-if = "this.form.email.length > this.maxEmailLen">
          More then {{maxEmailLen}}
        </p>
        <input
            type="password"
            v-model.trim="form.password"
            name="auth_pass"
            placeholder="Enter password:">
        <p class="error-message" v-if = "this.v$.form.password.required.$invalid">
          Fields Email is required
        </p>
        <p class="error-message" v-if = "this.form.password.length < this.minEmailLen">
          Less then {{minPasswordLen}}
        </p>
        <p class="error-message" v-if = "this.form.password.length > this.maxEmailLen">
          More then {{maxPasswordLen}}
        </p>
        <button
            class="form_auth_button"
            type="submit"
            name="form_auth_submit">
          Sign in</button>
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
.form_auth_button {
  color: white;
  background: #242424;
  display: block;
  width: 20%;
  margin: 5% auto;
  border-radius: 10px;
  height: 35px;
  border-color: black;
  cursor: pointer;
}
.error-message{
  margin-left: 15%;
  color: red;
  text-align: center;
  font-size: 10px
}
::-webkit-input-placeholder {color:#3f3f44; padding-left: 10px;}
:-moz-placeholder{color:#3f3f44; padding-left: 10px;}
:-moz-placeholder{color:#3f3f44; padding-left: 10px;}
:-ms-input-placeholder      {color:#3f3f44; padding-left: 10px;}
</style>

<script>
import axios from "axios";
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default {
  name: "LoginComponent",
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      maxEmailLen: 30,
      minEmailLen: 6,
      minPasswordLen: 6,
      maxPasswordLen: 30,
      authResponse: null
    }
  },
  validations: {
      form: {
        email: {
          required,
          email,
        },
        password: {
          required,
        }
      }
  },

  methods: {
    async getUser() {
      const url = `https://localhost:7143/api/Account/login?Email=${this.form.email}&Password=${this.form.password}`;
      //const resp = axios.get(url).then(response => response.data);

      /*const res = await fetch('https://localhost:7143/api/Account/login', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'includes',
        body: JSON.stringify({
          email: this.form.email,
          password: this.form.password
        })
      });*/

      // axios
      //     .get(url)
      //     .then(response => {
      //       console.log((response.data));
      //     });
      // console.log(this.response)
    },
    async checkForm(){
      console.log("1")
      //const url = `https://localhost:7143/api/Account/login?Email=${this.form.email}&Password=${this.form.password}`;
      const url = 'https://localhost:7143/api/Account/login?Email=ivan.vorotnikov.2002@mail.ru&Password=password'
      console.log("2")
      const resp = (await axios.get(url)).data;
      console.log(resp)
      alert(resp);
      alert("WHERE");
      }
    },
}
</script>

