<template>
  <div class="form_auth_block">
    <div class="form_auth_block_image"></div>
    <div class="form_auth_block_content">
      <p class="form_auth_block_head_text">Authorization</p>
      <form class="form_auth_style" @submit.prevent="checkForm">
        <input
            type="text"
            name="auth_email"
            placeholder="Enter your email:"
            v-model.trim="form.email"
            :class="{invalid: (v$.form.email.$dirty && !v$.form.email.required)
            || (v$.form.email.$dirty && !v$.form.email.email)
            || (v$.form.email.$dirty && !v$.form.email.minLength)
            || (v$.form.email.$dirty && !v$.form.email.maxLength)}"
        >
       <p class="error-message" v-if = "v$.form.email.$dirty && v$.form.email.required.$invalid">
         The email field is required
        </p>
        <p class="error-message" v-else-if = "v$.form.email.$dirty && v$.form.email.email.$invalid">
          Invalid email
        </p>
        <p class="error-message" v-else-if = "v$.form.email.$dirty && v$.form.email.minLength.$invalid">
          The email length must be more than {{v$.form.email.minLength.$params.min}} characters
        </p>
        <p class="error-message" v-else-if = "v$.form.email.$dirty && v$.form.email.maxLength.$invalid">
          The email length must be less than {{v$.form.email.maxLength.$params.max}} characters
        </p>
        <input
            type="password"
            v-model.trim="form.password"
            name="auth_pass"
            placeholder="Enter password:"
            :class="{invalid: (v$.form.password.$dirty && !v$.form.password.required)
            || (v$.form.password.$dirty && !v$.form.password.minLength)
            || (v$.form.password.$dirty && !v$.form.password.maxLength)}"
        >
        <p class="error-message" v-if = "v$.form.password.$dirty && v$.form.password.required.$invalid">
          The password field is required
        </p>
        <p class="error-message" v-else-if = "v$.form.password.$dirty && v$.form.password.minLength.$invalid">
          The password length must be more than {{v$.form.password.minLength.$params.min}} characters
        </p>
        <p class="error-message" v-else-if = "v$.form.password.$dirty && v$.form.password.maxLength.$invalid">
          The password length must be less than {{v$.form.password.maxLength.$params.max}} characters
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
  display: flex;
  width: 700px;
  height: 400px;
  background: grey;
  zoom: 140%;
}
.form_auth_block_content{
  display: block;
  width: 70%;
}

.form_auth_block_image{
  background-image: url(../assets/images/cam.png);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center ;
  width: 30%;
  margin-left:2%;
}

.form_auth_block_head_text{
  color: black;
  text-align: center;
  padding-bottom: 3%;
  font-size: 50px;
  font-weight: 600;
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
  width: 80%;
  height: 45px;
  margin: 20px;
  border-radius: 10px;
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

.invalid{
  color: red;
}
::-webkit-input-placeholder {color:#3f3f44; padding-left: 10px;}
:-moz-placeholder{color:#3f3f44; padding-left: 10px;}
:-moz-placeholder{color:#3f3f44; padding-left: 10px;}
:-ms-input-placeholder      {color:#3f3f44; padding-left: 10px;}
</style>

<script>
import axios from "axios";
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, maxLength } from '@vuelidate/validators'
import jwt_decode from "jwt-decode";

export default {
  name: "LoginComponent",
  setup() {
    return {v$: useVuelidate()}
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      authResponse: null
    }
  },
  validations: {
    form: {
      email: {
        required,
        email,
        minLength: minLength(6),
        maxLength: maxLength(30)
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(30)
      }
    }
  },

  methods: {
    async checkForm() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      await this.signUp()
    },

    async signUp() {
      const url = `https://localhost:7143/api/Account/login?Email=${this.form.email}&Password=${this.form.password}`;
      try {
        const {data} = await axios.get(url);
        const decodedToken = jwt_decode(data.value.accessToken);
        localStorage.setItem("tokenExpireData", decodedToken.exp);
        localStorage.setItem("userId", decodedToken.jti);
        localStorage.setItem("accessToken", data.value.accessToken);
        localStorage.setItem("refreshToken", data.value.refreshToken);
        await this.$router.push('/main');
      }
      catch(error){
        console.log(error);

        if (error.response.status == 400) {
          const errors = error.response.data.errors;

          if(errors != null){
            alert(errors.at(0))
          }
        }
      }
    },
  },
}
</script>

