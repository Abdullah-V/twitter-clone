<template>
  <div class="tweet-details-root">

    <div class="fixed-header-for-tweet-detail">
      <ActionButton action="goToBack" icon-class="fas fa-arrow-left" default-color="#1DA1F2" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton>
      <h2 style="padding-left: 5px">Tweet</h2>
    </div>

    <div v-if="$store.state.tweetForDetail.parent">
      <Tweet :info-for-tweet="$store.state.tweetForDetail.parent"></Tweet>
    </div>

    <Tweet :info-for-tweet="$store.state.tweetForDetail"></Tweet>

    <div :key="tweet._id" v-for="tweet in $store.state.tweetForDetail.replies">
      <Tweet :info-for-tweet="tweet"></Tweet>
    </div>

  </div>
</template>

<script>
import Tweet from "@/components/Tweet";
import ActionButton from "@/components/ActionButton";
import axios from "axios";

export default {
  components:{
    Tweet,
    ActionButton
  },
  watch:{
    '$route'(oldValue,newValue){
      console.log(oldValue.params)
      console.log(newValue.params)
      console.log("tweet watcher work")
      axios.post(`${process.env.VUE_APP_API_BASE_URL}/getthetweet`,{
        tweetId:oldValue.params.tweetId
      })
          .then(async (result) => {
            console.log(result.data)
            this.$store.state.tweetForDetail = await  result.data
            this.$store.state.tweetForDetail.isDetailed = true
          })
    }
  }
}
</script>

<style scoped>

.fixed-header-for-tweet-detail{
  position: sticky;
  left: 0px;
  top: 0px;
  z-index: 999;
  background: white;
  width: 100%;
  height: 55px;
  border: 1px solid #bfbfbf;
  border-top: 0px;
  display: flex;
  align-items: center;
  padding: 0px 10px;
}

.tweet-details-root{
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
  .tweet-details-root{
    width: 76.5%;
  }
}


</style>