<template>
  <div id="app">
    <login-component/>
  </div>
<!--  <div class="form_auth_block">
    <div class="form_auth_block_image">
      <img src="./images/cam.png" width="250">
    </div>
    <div class="form_auth_block_content">
      <p class="form_auth_block_head_text">Authorization</p>
      <form class="form_auth_style">
        <input type="email" v-model.trim="form.email" name="auth_email" placeholder="Enter your email:" required >
        <input type="password" v-model.trim="form.password" name="auth_pass" placeholder="Enter password:" required >
        <button class="form_auth_button" type="submit" name="form_auth_submit">Sign in</button>
      </form>
    </div>
  </div>-->
</template>

<script>
import LoginComponent from "./components/LoginComponent.vue";

export default {
  name: 'App',
  components: {
    LoginComponent
  }
}

/*
import axios from 'axios'
import styles from './assets/authfrom.css'
import {validationMixin} from 'vuelidate';
import {required} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin, ],

  data(){
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
    form: {
      email: {required, },
      password: {required, }
    }
  },

  methods:{
    checkEnterData(){
      alert(this.email)
      if(this.email.length > maxEmailLen){

      }
      if(this.email.length < minEmailLen){

      }
      if(this.password > maxPasswordLen){

      }
      if(this.password < maxPasswordLen){

      }
    },
  }
}*/
</script>
