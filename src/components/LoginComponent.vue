<template>
  <div class="container">
    <div class="form_auth_block">
        <p class="form_auth_block_head_text">Authorization</p>
        <form class="form_auth_user-elements" @submit="hi">
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
          <p class="error-message" v-if="v$.form.email.$dirty && v$.form.email.required.$invalid">
            The email field is required
          </p>
          <p class="error-message" v-else-if="v$.form.email.$dirty && v$.form.email.email.$invalid">
            Invalid email
          </p>
          <p class="error-message" v-else-if="v$.form.email.$dirty && v$.form.email.minLength.$invalid">
            The email length must be more than {{ v$.form.email.minLength.$params.min }} characters
          </p>
          <p class="error-message" v-else-if="v$.form.email.$dirty && v$.form.email.maxLength.$invalid">
            The email length must be less than {{ v$.form.email.maxLength.$params.max }} characters
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
          <p class="error-message" v-if="v$.form.password.$dirty && v$.form.password.required.$invalid">
            The password field is required
          </p>
          <p class="error-message" v-else-if="v$.form.password.$dirty && v$.form.password.minLength.$invalid">
            The password length must be more than {{ v$.form.password.minLength.$params.min }} characters
          </p>
          <p class="error-message" v-else-if="v$.form.password.$dirty && v$.form.password.maxLength.$invalid">
            The password length must be less than {{ v$.form.password.maxLength.$params.max }} characters
          </p>
          <div class="form_auth_login-buttons">
            <button
                class="form_auth_button"
                type="button"
                name="form_auth_submit"
                @click="handleClickLogIn">
              Log In
            </button>
            <GoogleSignInButton
                @success="handleLoginSuccess"
                @error="handleLoginError"
                class="form_auth_button_google"
            ></GoogleSignInButton>
          </div>
          <div class="form_auth_buttons_additional_buttons">
            <button
                class="form_auth_additional_button"
                type="button"
                @click="handleClickRegistration"
                name="form_auth_submit">
              Don't have an account yet?
            </button>

            <button
                class="form_auth_additional_button"
                type="button"
                @click="handleClickRecoveryPassword"
                name="form_auth_submit">
              Forgot your password?
            </button>
          </div>
        </form>
      </div>
  </div>
</template>

<script>
import axios from "axios";
import {useVuelidate} from '@vuelidate/core'
import {required, email, minLength, maxLength} from '@vuelidate/validators'
import jwt_decode from "jwt-decode";
import {GoogleSignInButton} from "vue3-google-signin";
import {isAuthorize} from "@/auth.js";

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
    async handleClickLogIn() {
      console.log(this.v$.$invalid);
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }
      await this.logIn()
    },

    async logIn() {
      const url = `https://localhost:7143/api/Account/login?Email=${this.form.email}&Password=${this.form.password}`;
      try {
        const {data} = await axios.get(url);
        this.setAuthDataToLocalStorage(data.value);
        await this.$router.push({name: "main-page"});
      }
      catch (error) {
        console.log(error);

        if (error.response.status == 400) {
          const errors = error.response.data.errors;

          if (errors != null) {
            alert(errors.at(0))
          }
        }
      }
    },

    setAuthDataToLocalStorage(data) {
      const decodedToken = jwt_decode(data.accessToken);
      localStorage.setItem("tokenExpireData", decodedToken.exp);
      localStorage.setItem("userId", decodedToken.jti);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("userName", data.data.userName);
      localStorage.setItem("email", data.data.email);
    },

    async handleClickRegistration() {
      alert("go to registration")
    },

    async handleClickRecoveryPassword() {
      await this.$router.push({name: 'recovery-password-page'});
    },

    // handle success event
    async handleLoginSuccess(response) {
      const {credential} = response;
      console.log("Access Token", credential);
      const url = `https://localhost:7143/api/Account/login-google/${credential}`;

      try {
        const {data} = await axios.post(url);
        console.log(data);
        this.setAuthDataToLocalStorage(data.value.accessToken, data.value.refreshToken);
        await this.$router.push('/main');
      } catch (error) {
        console.log(error);

        if (error.response.status == 400) {
          const errors = error.response.data.errors;

          if (errors != null) {
            alert(errors.at(0))
          }
        }
      }
    },

    // handle an error event
    handleLoginError() {
      console.error("Login failed");
    },
  },

  async mounted() {
    if (await isAuthorize()) {
      await this.$router.push({name: "main-page"})
    }
  },
}
</script>

<style scoped>
*{
  box-sizing: border-box;
}

.container{
  margin: auto;
  max-width: 1280px;
  width: 100%;
  height: 100%;
  align-content: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  background: none;
}

html{
  width: 100%;
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  background: #111114;
  width: 100%;
  height: 100%;
}

.form_auth_block{
  display: block;
  width: 40%;
  min-width: 250px;
  height: 60%;
  min-height: 500px;
  background: white;
  justify-content: center;
  align-content: center;
  margin: 20vh auto 0px auto;
  border-radius: 30px;
}

.form_auth_block_head_text{
  color: black;
  text-align: center;
  font-size: 4vw;
  font-weight: 600;
  height: 20%;
  margin: 20px auto 20px auto;
}

.form_auth_login-buttons{
  display: flex;
  margin: 10% auto;
  width: 80%;
}

.form_auth_user-elements{
  text-aighn: center;
  height: 80%;
}

.form_auth_block input{
  width: 70%;
  height: 45px;
  border-radius: 10px;
  border-color: black;
  display: block;
  font-size: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5%;
}

input:focus {
  color: #000000;
  border-radius: 10px;
  border: 2px solid #436fea;
}

.form_auth_button {
  color: white;
  background: darkslategray;
  display: block;
  width: 30%;
  border-radius: 10px;
  height: 35px;
  border-color: black;
  cursor: pointer;
  font-size: 20px;
  margin: 0 auto;
}

.form_auth_button_google{
  width: 50%;
  margin: 0 auto;
}

.form_auth_buttons_additional_buttons{
  display: block;
  width: 70%;
  margin: 0 auto;
}

.form_auth_additional_button {
  width: 50%;
  border: none;
  text-decoration: underline;
  font-size: 15px;
}

.error-message{
  margin-left: 15%;
  color: red;
  text-align: center;
  font-size: 20px
}

.invalid{
  color: red;
}
::-webkit-input-placeholder {color:#3f3f44; padding-left: 20px;}
:-moz-placeholder{color:#3f3f44; padding-left: 20px;}
:-moz-placeholder{color:#3f3f44; padding-left: 20px;}
:-ms-input-placeholder      {color:#3f3f44; padding-left: 20px;}
</style>