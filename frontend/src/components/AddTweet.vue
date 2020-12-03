<template>
  <div class="add-tweet-root">
    <img class="add-tweet-user-img" :src="addTweetUserImg" alt="">
    <div class="add-tweet-section2">
      <textarea placeholder="What's happening?"></textarea>
      <div class="bottom-tool-bar">
        <div class="tools">
          <ActionButton iconClass="far fa-file-image" default-color="#1DA1F2" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton>
          <ActionButton iconClass="fas fa-photo-video" default-color="#1DA1F2" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton>
          <ActionButton iconClass="fas fa-chart-bar" default-color="#1DA1F2" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton>
          <ActionButton iconClass="far fa-smile" default-color="#1DA1F2" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton>
          <ActionButton iconClass="far fa-calendar-alt" default-color="#1DA1F2" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton>

        </div>
        <TwitterButton h="40px" w="75px" br="20px" text="Tweet" bgType="blue"></TwitterButton>
      </div>
    </div>
  </div>
</template>

<script>
import ActionButton from "@/components/ActionButton";
import TwitterButton from "@/components/TwitterButton";

export default {
  components:{
    ActionButton,
    TwitterButton
  },
  props:["addTweetUserImg"],
}
</script>

<style scoped>

.add-tweet-root{
  width: 100%;
  min-height: 150px;
  max-height: 535px;
  padding: 10px 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid #bfbfbf;
  border-top: 0px;
}

.add-tweet-user-img{
  width: 50px;
  height: 50px;
  border-radius: 25px;
}

.add-tweet-section2{
  width: 90%;
  display: flex;
  flex-direction: column;
  /*justify-content: center;*/
  align-items: center;
  padding-top: 10px;
}

textarea{
  border: 0px;
  width: 100%;
  min-height: 90px;
  max-height: 535px;
  border-bottom: 1px solid #bfbfbf;
  resize: none;
  margin-bottom: 10px;
  font-size: 20px;
}

.bottom-tool-bar{
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-between;
}

.tools{
  display: flex;
}






</style>