<template>
  <div class="tweet-root">

    <div v-if="tweetActionLVisible" class="tweet-actions-list">
      <div class="tweet-actions-list-item">
        <i class="fas fa-user-alt-slash"></i>
        Unfollow {{ tweetUserUsername }}
      </div>
      <div class="tweet-actions-list-item">
        <i class="far fa-list-alt"></i>
        Add/remove from lists
      </div>
      <div class="tweet-actions-list-item">
        <i class="fas fa-volume-mute"></i>
        Mute {{ tweetUserUsername }}
      </div>
      <div class="tweet-actions-list-item">
        <i class="fas fa-ban"></i>
        Block {{ tweetUserUsername }}
      </div>
      <div class="tweet-actions-list-item">
        <i class="fas fa-code"></i>
        Embed tweet
      </div>
      <div class="tweet-actions-list-item">
        <i class="fas fa-flag"></i>
        Report tweet
      </div>
    </div>
    
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
        <span @click="toggleTweetActionLVisible()" class="header-sec2"><ActionButton icon-class="fas fa-ellipsis-h" default-color="#5B7083" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton></span>
      </div>
      <div class="tweet-content">
        <div class="tweet-text" v-if="tweetText">
          <pre v-html="tweetText"></pre>
        </div>
        <img v-if="tweetImg" class="tweet-img" :src="tweetImg" alt="">
      </div>
      <div class="tweet-action-buttons">
        <span class="with-count">
          <ActionButton iconClass="far fa-comment"  default-color="#5B7083" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton>
          <span class="count">{{ replyCount }}</span>
        </span>
        <span class="with-count">
          <ActionButton iconClass="fas fa-retweet"  default-color="#5B7083" hover-color="#17BF63" hover-bg="#E0F2E8"></ActionButton>
          <span class="count">{{ commentCount }}</span>
        </span>
        <span class="with-count">
        <ActionButton iconClass="far fa-heart"  default-color="#5B7083" hover-color="#E0245E" hover-bg="#F5E1E7"></ActionButton>
          <span class="count">{{ likeCount }}</span>
        </span>
        <ActionButton iconClass="fas fa-upload"  default-color="#5B7083" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton>

      </div>
    </div>

  </div>
</template>

<script>
import ActionButton from "@/components/ActionButton";

export default {
  props:["replyCount","commentCount","likeCount","tweetUserImg","tweetUserName","tweetUserUsername","tweetText","tweetImg","tweetCreatedDate"],
  components:{
    ActionButton
  },
  data(){
    return{
      tweetActionLVisible:false,
    }
  },
  mounted() {
    var r = this.tweetText.replaceAll(this.$store.state.hashtagRegex,"<a href=" + "'#$1'>#$1</a>")
    r = r.replaceAll(this.$store.state.usernameRegex,"<a href=" + "'#$1'>@$1</a>")
    this.tweetText = r
  },
  methods:{
    toggleTweetActionLVisible(){
      this.tweetActionLVisible = !this.tweetActionLVisible
    }
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

.count{
  color: #5B7083;
}

.with-count{
  display: flex;
  align-items: center;
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


.tweet-actions-list{
  width: 210px;
  height: auto;
  background:white;
  position:absolute;
  right: 70px;
}

.tweet-actions-list-item{
  height: 50px;
  width: 100%;
  padding: 0px 8px;
  display: flex;
  align-items: center;
  transition: 300ms all;
}

.tweet-actions-list-item i{
  margin: 0px 6px;
  color: #5B7083;
}

.tweet-actions-list-item:hover{
  background: #ececec;
}

</style>