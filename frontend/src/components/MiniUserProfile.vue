<template>
  <div class="mini-user-profile-root">
    <img :src="imgSrc" alt="">
    <div class="profile-section2">

      <div class="name-and-follow-btn">

        <span class="name-and-username">
          <span class="name">{{ name }}</span>
          <span class="username">{{ username }}</span>
        </span>

        <span class="follow-btn"><TwitterButton class="flw-btn" w="75px" h="30px" br="15px" text="Follow" bgType="white"></TwitterButton></span>

      </div>

      <span class="text" v-if="text">{{ text }}</span>

    </div>
  </div>
</template>

<script>
import TwitterButton from "@/components/TwitterButton";

export default {
  props:["imgSrc","name","username","text"],
  components:{
    TwitterButton
  },
}
</script>

<style scoped>

.mini-user-profile-root{
  width: 100%;
  min-height: 70px;
  height: auto;
  border-top: 1px solid #EBEEF0;
  border-bottom: 1px solid #EBEEF0;
  border-left: 0px;
  border-right: 0px;
  padding: 10px 10px;
  display: flex;
  justify-content: flex-start;
  transition: 200ms all;
  cursor: pointer;
}

.mini-user-profile-root:hover{
  background: #F4F6F7;
}

.profile-section2{
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
  width: 100%;
  margin-left: 3px;
}

.name-and-follow-btn{
  width: 100%;
  display: flex;
  justify-content: space-between;
  /*margin-right: 25px;*/
}

.mini-user-profile-root img{
  width: 40px;
  height: 40px;
  border-radius: 20px;
}

.name-and-username{
  display: flex;
  flex-direction: column;
}

.username{
  font-size: 15px;
  color: #5B7083;
  margin-top: 2px;
}

.name{
  font-weight: bold;
}

.name:hover{
  text-decoration: underline;
}

.flw-btn{}

.text{
  margin-top: 3px;
}

/* https://pbs.twimg.com/profile_images/1292037327607537664/qk0xY9nj_400x400.jpg */






</style>