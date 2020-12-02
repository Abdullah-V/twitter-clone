<template>
  <div class="tweet-root">

    <div class="tweet-section1">
      <img :src="tweetUserImg" alt="">
    </div>

    <div class="tweet-section2">
      <div class="tweet-section2-header">
        <span class="header-sec1">
          <span class="name">{{ tweetUserName }}</span>
          <span class="username">{{ tweetUserUsername }}</span>
          <span class="uc">&#8226;</span>
          <span class="created-date">{{ tweetCreatedDate }}</span>
        </span>
        <span class="header-sec2"><ActionButton icon-class="fas fa-ellipsis-h" default-color="#5B7083" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton></span>
      </div>
      <div class="tweet-content">
        <div class="tweet-text" v-if="tweetText">
          <pre v-html="tweetText"></pre>
        </div>
        <img v-if="tweetImg" class="tweet-img" :src="tweetImg" alt="">
      </div>
      <div class="tweet-action-buttons">
        <ActionButton iconClass="far fa-comment"  default-color="#5B7083" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton>
        <ActionButton iconClass="fas fa-retweet"  default-color="#5B7083" hover-color="#17BF63" hover-bg="#E0F2E8"></ActionButton>
        <ActionButton iconClass="far fa-heart"  default-color="#5B7083" hover-color="#E0245E" hover-bg="#F5E1E7"></ActionButton>
        <ActionButton iconClass="fas fa-share-square"  default-color="#5B7083" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton>

      </div>
    </div>

  </div>
</template>

<script>
import ActionButton from "@/components/ActionButton";

export default {
  props:["tweetUserImg","tweetUserName","tweetUserUsername","tweetText","tweetImg","tweetCreatedDate"],
  components:{
    ActionButton
  },
  data(){
    return{
      hashtagRegex:/(?:(?<=\s)|^)#(\w*[A-Za-z_ğüşıöçĞÜŞİÖÇ]+\w*)/gi,
      usernameRegex:/(?:(?<=\s)|^)@(\w*[A-Za-z_ğüşıöçĞÜŞİÖÇ]+\w*)/gi,
    }
  },
  mounted() {
    var r = this.tweetText.replaceAll(this.hashtagRegex,"<a href=" + "'#$1'>#$1</a>")
    r = r.replaceAll(this.usernameRegex,"<a href=" + "'#$1'>@$1</a>")
    this.tweetText = r
  }
}
</script>

<style scoped>

.tweet-root{
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px 10px;
  background: white;
  border-bottom: 1px solid #bfbfbf;
  border-right: 1px solid #bfbfbf;
  border-left: 1px solid #bfbfbf;
  transition: 200ms all;
  cursor: pointer;
}

.tweet-root:hover{
  background: #F7F7F7;
}

.tweet-text{
  width: 100%;
}

.tweet-text pre{
  line-height: 23px;
  font-weight: lighter;
  font-family: Arial;
  font-size: 18px;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
}

.tweet-root .tweet-section1 img{
  width: 50px;
  height: 50px;
  border-radius: 25px;
}

.tweet-section2{
  display: flex;
  flex-direction: column;
  width: 90%;
}

.tweet-section2-header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.tweet-img{
  width: 100%;
  height: 300px;
  border-radius: 17px;
  margin: 20px 0px;
}

.header-sec1 .name{
  font-weight: bold;
}

.header-sec1 .username,.created-date,.uc{
  color: #5B7083;
  padding: 0px 4px;
}

.name:hover{
  text-decoration: underline;
}

.tweet-content{
  font-size: 16px;
  width: 100%;
}

.tweet-action-buttons{
  display: flex;
  justify-content: space-between;
  width: 80%;
}


</style>