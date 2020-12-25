<template>
  <div class="add-tweet-popup-root">
    <div class="popup">
      <div class="popup-header"><ActionButton action="closeAddTweetPopup" icon-class="fas fa-times" default-color="#1DA1F2" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton></div>
      <span style="pointer-events: none">
        <Tweet :info-for-tweet="$store.state.repliedTweet" v-if="Object.keys($store.state.repliedTweet).length"></Tweet>
      </span>
      <AddTweet cevent="addReply" v-if="Object.keys($store.state.repliedTweet).length > 1" btntext="Reply" p="Tweet your reply"></AddTweet>
      <AddTweet v-else></AddTweet>
    </div>
  </div>
</template>


<script>
import AddTweet from "@/components/AddTweet";
import ActionButton from "@/components/ActionButton";
import Tweet from "@/components/Tweet";

export default {
  components:{
    AddTweet,
    ActionButton,
    Tweet
  },
  created() {
    this.$store.state.repliedTweet.isDetailed = false
  }
}
</script>

<style scoped>

.add-tweet-popup-root{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  background: rgba(0,0,0,.5);
  /*display: flex;*/
  /*align-items: center;*/
  /*justify-content: center;*/
  z-index: 99999;
  scrollbar-width: none;
}

.add-tweet-popup-root .popup{
  overflow: auto;
  width: 50%;
  min-height: 50%;
  max-height: 90%;
  border-radius: 20px;
  background: white;
  display: flex;
  flex-direction: column;
  opacity: 1;
  outline: none;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}

.add-tweet-popup-root .popup .popup-header{
  border-bottom: 1px solid #bfbfbf;
  padding-left: 15px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0px;
  left: 0px;
  background: white;
  z-index: 99;
}

@media screen and (max-width: 770px){
  .add-tweet-popup-root .popup{
    width: 90%;
  }
}
















</style>