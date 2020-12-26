<template>

    <div class="main-section">
      <div class="fixed-header-for-home">
        <span class="fixed-header-text">Home</span>
        <span>
          <ActionButton action="sampleAction" icon-class="fas fa-home" default-color="#1DA1F2" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton>
        </span>
      </div>
      <div class="tweets">
        <AddTweet :add-tweet-user-img="$store.state.currentUser.profileImage || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'"></AddTweet>
        <div :key="tweet._id" v-for="tweet in $store.state.tweets">
          <Tweet v-if="!tweet.isReply" :info-for-tweet="tweet"></Tweet>
        </div>
<!--        {{ $store.state.tweets }}-->
<!--        <span :key="tweet._id" v-for="tweet in $store.state.tweets">-->
<!--          <h1>HERE: </h1>{{ tweet }}-->
<!--        </span>-->
      </div>
    </div>

</template>

<script>
import Tweet from "@/components/Tweet";
import ActionButton from "@/components/ActionButton";
import AddTweet from "@/components/AddTweet";
import { methodsMixin } from "@/methodsMixin";

export default {
  mixins:[methodsMixin],
  components:{
    Tweet,
    ActionButton,
    AddTweet
  },
  created() {
    this.restartTweets()
  }
}
</script>

<style scoped>
.fixed-header-for-home{
  width: 51%;
  background: white;
  height: 55px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 4px 0px 15px;
  border: 1px solid #bfbfbf;
  position: fixed;
  z-index: 9;
}

.fixed-header-text{
  font-size: 22px;
  font-weight: bolder;
}

.tweets{
  margin-top: 55px;
}

.main-section{
  width: 51%;
  height: 100%;
  background: white;
  position: fixed;
  top: 0px;
  left: 23.5%;
  overflow: auto;
  scrollbar-width: none;
}

@media screen and (max-width: 1000px){
  .main-section,.fixed-header-for-home{
    width: 76.5%;
  }
}


</style>