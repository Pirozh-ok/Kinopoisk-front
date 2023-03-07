<template>
  <div class="container1">
    <div class="avatar">
      <img :src="getAvatarUrl()" alt="">
    </div>
    <div class="comment-text" :style="`background-color:${colorsBackComment.get(rating)}`">
      <div class="username-and-rating">
        <p class="userName">{{ username }}</p>
        <!--      <p>Rating:{{rating}}</p>-->
        <div class="rating-star" v-show="rating > 0"></div>
        <div class="rating-star" v-show="rating > 1"></div>
        <div class="rating-star" v-show="rating > 2"></div>
        <div class="rating-star" v-show="rating > 3"></div>
        <div class="rating-star" v-show="rating > 4"></div>
      </div>
      <p>{{ comment }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: "ViewCommentComponent",

  props: {
    rating: Number,
    comment: String,
    username: String
  },

  data() {
    return {
      listBackgroundColors: ["1abc9c", "16a085", "f1c40f", "f39c12", "2ecc71", "27ae60", "e67e22", "d35400", "3498db", "2980b9", "e74c3c", "9b59b6", "8e44ad", "34495e", "2c3e50", "95a5a6", "7f8c8d"],
      colorsBackComment: new Map()
    }
  },

  methods: {
    getAvatarUrl() {
      let codeOfColorAvatar = this.listBackgroundColors[Math.floor(Math.random() * this.listBackgroundColors.length)];
      return `https://ui-avatars.com/api/?length=1&name=${this.username}&rounded=true&background=${codeOfColorAvatar}&color=fff`
    }
  },

  mounted() {
    this.colorsBackComment.set(1, "rgba(255, 0, 0, 40%)");
    this.colorsBackComment.set(2, "rgba(255, 72, 0, 40%)");
    this.colorsBackComment.set(3, "rgba(255, 183, 0, 40%)");
    this.colorsBackComment.set(4, "rgba(145, 255, 0, 40%)");
    this.colorsBackComment.set(5, "rgba(0, 255, 43, 40%)");
  }
}
</script>

<style scoped>
@import url("//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css");

.container1 {
  width: 90%;
  height: 5%;
  display: flex;
  flex-direction: row;
  color: black;
  border-radius: 20px;
  margin: 0 auto 10px auto;
}

.avatar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5%;
  height: 90%;
  border-color: black;
  margin-right: 2%;
}

.comment-text {
  display: flex;
  flex-direction: column;
  color: #000000;
  width: 80%;
  justify-content: center;
  border-radius: 20px;
  padding-left: 2%;
}

.username-and-rating {
  font-weight: bold;
  display: inline-flex;
}

.comment-text p {
  color: black;
}

.userName {
  margin-right: 10px;
  margin-bottom: 10px;
  font-size: calc(0.5vh + 1vw)
}

.rating-star {
  width: calc(0.5vh + 0.5vw);
  height: calc(0.5vh + 0.5vw);
  background-image: url("../assets/images/rating-star.svg");
  background-size: cover;
  margin-top: 0.5%
}

</style>