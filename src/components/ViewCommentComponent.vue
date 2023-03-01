<template>
  <div class="container1">
    <div class="avatar">
      <img :src="getAvatarUrl()" alt="">
    </div>
    <div class="comment-text">
      <p class="userName">{{username}}</p>
      <p>Rating:{{rating}}</p>
      <p>{{comment}}</p>
    </div>
  </div>
</template>

<script>
// import { FirstLetterAvatar } from 'first-letter-avatar';
//
// const avatar = new FirstLetterAvatar({
//   avatarsSelector: ".avatar",
//   namesSelector: ".userName",
//   backgroundColor: "#171923",
//   letterColor: "#fff",
//   isCircle: true,
// }).renderAvatar();

export default {
  name: "ViewCommentComponent",

  props: {
    rating: Number,
    comment: String,
    username: String
  },

  data(){
    return {
      listBackgroundColors: ["1abc9c", "16a085", "f1c40f", "f39c12", "2ecc71", "27ae60", "e67e22", "d35400", "3498db", "2980b9", "e74c3c", "9b59b6", "8e44ad", "34495e", "2c3e50", "95a5a6", "7f8c8d"]
    }
  },

  methods:{
    getAvatarUrl(){
      let codeOfColorAvatar = this.listBackgroundColors[Math.floor(Math.random() * this.listBackgroundColors.length)];
      return `https://ui-avatars.com/api/?length=1&name=${this.username}&rounded=true&background=${codeOfColorAvatar}&color=fff`
    }
  }
}
</script>

<style scoped>
.container1 {
  width: 90%;
  height: 5%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  color: black;
  margin-bottom: 10px;
}

.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5%;
  height: 90%;
  /*height: 60px;*/
  /*width: 60px;*/
  border-color: black;
}

.comment-text{
  display: flex;
  flex-direction: column;
  color: #000000;
  width: 80%;
}

.comment-text p{
  color: black;
}
</style>