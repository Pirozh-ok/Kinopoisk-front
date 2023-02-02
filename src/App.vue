<template>
  <router-view class="router"/>
</template>

<style scoped>
.router{
  width: 60%;
  height: 60%;
  margin-left: 20%;
  margin-top: 10%;
  position: absolute;
}
</style>

<script>
import LoginComponent from "@/components/LoginComponent.vue";
import PasswordRecoveryComponent from "@/components/PasswordRecoveryComponent.vue";

export default {
  name: 'App',
  components: {LoginComponent, PasswordRecoveryComponent},
}
</script>
