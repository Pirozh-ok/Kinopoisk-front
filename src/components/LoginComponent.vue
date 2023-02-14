<template>
  <div class="container">
    <div class="form_auth_block">
        <p class="form_auth_block_head_text">Authorization</p>
        <form class="form_auth_user-elements">
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
                type="submit"
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
                type="submit"
                @click="handleClickRegistration"
                name="form_auth_submit">
              Don't have an account yet?
            </button>

            <button
                class="form_auth_additional_button"
                type="submit"
                @click="handleClickRecoveryPassword"
                name="form_auth_submit">
              Forgot your password?
            </button>
          </div>
        </form>
      </div>
  </div>
</template>

<style scoped>
@import '../assets/css/login.css';
</style>

<script>
import axios from "axios";
import {useVuelidate} from '@vuelidate/core'
import {required, email, minLength, maxLength} from '@vuelidate/validators'
import jwt_decode from "jwt-decode";
import {GoogleSignInButton} from "vue3-google-signin";

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

    setAuthDataToLocalStorage(accessToken, refreshToken) {
      const decodedToken = jwt_decode(accessToken);
      localStorage.setItem("tokenExpireData", decodedToken.exp);
      localStorage.setItem("userId", decodedToken.jti);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
    },

    async handleClickRegistration() {
      alert("go to registration")
    },

    async handleClickRecoveryPassword() {
      await this.$router.push('/recovery-password');
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

    async isAuthorize() {
      if (localStorage.getItem("accessToken") === null) {
        return false;
      }

      if (new Date(Date.now()) > new Date(localStorage.getItem("tokenExpireData") * 1000)) {
        return false;
      }

      return true;
    }
  },

  async mounted() {
    const a = await this.isAuthorize();
    console.log(a);
    if (a) {
      await this.$router.push('/main')
    }
  },
}
</script>

