<template>
  <div class="add-tweet-root">
    <img class="add-tweet-user-img" :src="$store.state.currentUser.profileImage || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'" alt="">
    <div class="add-tweet-section2">
      <textarea v-model="$store.state.newTweet.text" :placeholder="p || `What's happening?`"></textarea>
      <img style=" width: 100%;
  height: 275px;
  border-radius: 17px;
  margin: 20px 0px;" v-if="$store.state.newTweet.image && isImage()" :src="$store.state.newTweet.image" alt="">
      <h3 style="color: #ef3615;" v-if="$store.state.newTweet.image && !isImage()">Please enter a valid URL</h3>
      <input v-model="$store.state.newTweet.image" type="text" placeholder="Image URL">
      <div class="bottom-tool-bar">
        <div class="tools">
          <ActionButton iconClass="far fa-file-image" default-color="#1DA1F2" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton>
          <ActionButton iconClass="fas fa-photo-video" default-color="#1DA1F2" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton>
          <ActionButton iconClass="fas fa-chart-bar" default-color="#1DA1F2" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton>
          <ActionButton iconClass="far fa-smile" default-color="#1DA1F2" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton>
          <ActionButton iconClass="far fa-calendar-alt" default-color="#1DA1F2" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton>

        </div>
        <TwitterButton :click-event="cevent || 'addNewTweet'" h="40px" w="75px" br="20px" :text="btntext || 'Tweet'" bgType="blue"></TwitterButton>
      </div>
    </div>
  </div>
</template>

<script>
import ActionButton from "@/components/ActionButton";
import TwitterButton from "@/components/TwitterButton";

export default {
  props:["p","btntext","cevent"],
  data(){
    return {
      urlRegex: new RegExp('(https?:\\/\\/)|(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', 'ig'),
    }
  },
  components:{
    ActionButton,
    TwitterButton
  },
  methods:{
    isImage(){
      if(this.$store.state.newTweet.image.match(this.urlRegex)){
        return true
      }
    }
  }
}
</script>

<style scoped>

.add-tweet-root{
  width: 100%;
  /*min-height: 150px;*/
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
  align-items: center;
  padding-top: 10px;
}

textarea,
input{
  border: 0px;
  width: 100%;
  border-bottom: 1px solid #bfbfbf;
  resize: none;
  margin-bottom: 10px;
  font-size: 20px;
}

textarea{
  min-height: 90px;
  max-height: 535px;
}

input{
  min-height: 40px;
  max-height: 535px;
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