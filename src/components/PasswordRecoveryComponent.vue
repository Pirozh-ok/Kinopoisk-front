<template>
<div class="form-recovery-password">
  <div class="form-recovery-password_header">
    Forgot your password?
  </div>
  <div class="form-recovery-password_message">
    Please enter your email address and we'll send
    <br> you a link to reset your password.
  </div>
  <input type="text">
  <button >
    
  </button>
</div>
</template>

<script>
export default {
  name: "PasswordRecoveryComponent"
}
</script>

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
</style>