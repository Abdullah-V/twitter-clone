<template>
  <div class="add-tweet-popup-root">
    <div class="popup">
      <div class="popup-header"><ActionButton action="toggleAddTweetPopup" icon-class="fas fa-times" default-color="#1DA1F2" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton></div>
      <AddTweet></AddTweet>
    </div>
  </div>
</template>

<script>
import AddTweet from "@/components/AddTweet";
import ActionButton from "@/components/ActionButton";

export default {
  components:{
    AddTweet,
    ActionButton
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
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
}

.add-tweet-popup-root .popup{
  width: 50%;
  height: 50%;
  border-radius: 20px;
  background: white;
  display: flex;
  flex-direction: column;
  opacity: 1;
  outline: none;
}

.add-tweet-popup-root .popup .popup-header{
  border-bottom: 1px solid #bfbfbf;
  padding-left: 15px;
  display: flex;
  align-items: center;
}

@media screen and (max-width: 770px){
  .add-tweet-popup-root .popup{
    width: 90%;
  }
}
















</style>