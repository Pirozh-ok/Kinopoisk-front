<template>
    <router-view class="router"/>
</template>

<style scoped>
.router{
  width: 100%;
  background: white;
}
</style>

<script>
import LoginComponent from "@/components/LoginComponent.vue";

export default {
  name: 'App',
  components: {LoginComponent},
}
</script>
