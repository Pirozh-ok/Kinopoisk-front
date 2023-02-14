<template>
<div class="form-recovery-password">
  <div class="form-recovery-password_header">
    Forgot your password?
  </div>
  <div class="form-recovery-password_message">
    Please enter your email address and we'll send
    <br> you a link to reset your password.
  </div>
  <input
      type="text"
      class="form-recovery-password_input"
      v-model.trim="email"
      placeholder="Enter your email:"
  >
  <button
      type="submit"
      @click="sendEmail"
      class="form-recovery-password_submit-button">
    Send link
  </button>
  <button
      type="submit"
      @click="redirectToRegistration"
      class="form-recovery-password_additional_button">
    Don't have an account yet?
  </button>
</div>
</template>

<style scoped>
.form-recovery-password{
  width: 100%;
  height: 100%;
  background-color: white;
  text-align: center;
}

.form-recovery-password_header {
  color: black;
  font-size: 5vh;
  font-weight: 600;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
}

.form-recovery-password_message {
  color: black;
  font-size: 3vh;
  font-weight: 300;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
}

.form-recovery-password_submit-button {
  color: white;
  background: darkslategray;
  display: block;
  width: 20%;
  margin: 3% auto;
  border-radius: 10px;
  height: 35px;
  border-color: black;
  cursor: pointer;
  font-size: 20px;
}

.form-recovery-password_input {
  width: 70%;
  height: 10%;
  border-radius: 10px;
  border-color: black;
  display: block;
  font-size: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
}

.form-recovery-password_additional_button{
  border: none;
  text-decoration: underline;
  font-size: 2vh;
}
</style>

<script>
import axios from "axios";

export default {
  name: "PasswordRecoveryComponent",
  data(){
    return {
      email: ""
    }
  },
  methods: {
    async sendEmail(){
      const url = `https://localhost:7143/api/Account/forgot-password?Email=${this.email}`;
      try{
        const {data} = await axios.post(url);
        console.log(data);
        alert("To recover your password, please check your email");
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
    redirectToRegistration(){
      alert("go to registration")
    }
  }
}
</script>