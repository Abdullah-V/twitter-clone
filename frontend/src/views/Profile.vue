<template>
  <div class="profile-root">
    <div class="fixed-header-for-profile">
      <ActionButton action="goToBack" icon-class="fas fa-arrow-left" default-color="#1DA1F2" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton>
      <span>
        <h2>Selçuk Bayraktar</h2>
        <h5 class="user-tweet-count">2,300 tweet</h5>
      </span>
    </div>
    <img @click.stop="zoomedBannerImage()" class="banner-img" src="https://pbs.twimg.com/profile_banners/2271763025/1598131465/1500x500" alt="">
    <div class="profile-section">
      <div class="photo-and-buttons">
        <div class="profile-img">
          <img @click="zoomedProfileImage()" src="https://pbs.twimg.com/profile_images/1155141513858433027/nJcIRDau_400x400.jpg" alt="">
        </div>
        <span class="profile-buttons">
          <TwitterButton h="40px" w="40px" br="20px" text="<i class='fas fa-ellipsis-h'></i>" bgType="white"></TwitterButton>
          <TwitterButton h="40px" w="40px" br="20px" text="<i class='far fa-bell'></i>" bgType="white"></TwitterButton>
          <TwitterButton h="40px" w="105px" br="20px" text="Follow" bgType="white"></TwitterButton>
        </span>
      </div>
      <h2>Selçuk Bayraktar</h2>
      <h4 class="user-tweet-count">@Selcuk</h4>

      <pre v-html="user.bio"></pre>

      <span class="some-info"><i class="fas fa-map-marker-alt"></i><span>Istanbul</span></span>
      <span class="some-info"><i class="fas fa-envelope"></i><a href="mailto:selcuk@bayraktar.com">selcuk@bayraktar.com</a></span>
      <span class="some-info"><i class="fas fa-link"></i><a href="#">baykarsavunma.com</a></span>
      <span class="some-info"><i class="far fa-calendar-alt"></i><span>Joined January 24</span></span>

      <span class="f-and-f">
        <span class="ff"><b>848</b> <span class="ftext">Following</span></span>
        <span class="ff"><b>1.4m</b> <span class="ftext">Followers</span></span>
      </span>

      <div class="profile-tabs">
        <div class="a-profile-tab" @click="tabClick(0)">Tweets</div>
        <div class="a-profile-tab" @click="tabClick(1)">Tweets & replies</div>
        <div class="a-profile-tab" @click="tabClick(2)">Media</div>
        <div class="a-profile-tab" @click="tabClick(3)">Likes</div>
      </div>

    </div>


    <div style="position: relative;bottom: 95px">
      <div v-for="(tweet,index) in $store.state.tweets" :key="index">
        <Tweet :info-for-tweet="tweet"></Tweet>
      </div>



<!--    <Tweet-->
<!--        is-detailed="true"-->
<!--        tweet-user-name="Selçuk Bayraktar"-->
<!--        tweet-user-username="@Selcuk"-->
<!--        tweet-created-date="11h"-->
<!--        tweet-user-img="https://pbs.twimg.com/profile_images/1155141513858433027/nJcIRDau_400x400.jpg"-->
<!--        tweet-text="-->
<!--#BayraktarTB2 S/İHA-->

<!--7/24 devam eden uçuş eğitimlerinden...-->

<!--#MilliTeknolojiHamlesi"-->
<!--        tweet-img="https://pbs.twimg.com/media/EoLHVqaXYAcny8X?format=jpg&name=large"-->
<!--        like-count="6.9k"-->
<!--        comment-count="946"-->
<!--        reply-count="2.1k"-->
<!--    ></Tweet>-->

<!--    <Tweet-->
<!--        tweet-user-name="Selçuk Bayraktar"-->
<!--        tweet-user-username="@Selcuk"-->
<!--        tweet-created-date="11h"-->
<!--        tweet-user-img="https://pbs.twimg.com/profile_images/1155141513858433027/nJcIRDau_400x400.jpg"-->
<!--        tweet-text="-->
<!--#BayraktarTB2 S/İHA-->

<!--7/24 devam eden uçuş eğitimlerinden...-->

<!--#MilliTeknolojiHamlesi"-->
<!--        tweet-img="https://pbs.twimg.com/media/EoLHVqaXYAcny8X?format=jpg&name=large"-->
<!--        like-count="6.9k"-->
<!--        comment-count="946"-->
<!--        reply-count="2.1k"-->
<!--    ></Tweet>-->

<!--    <Tweet-->
<!--        tweet-user-name="Selçuk Bayraktar"-->
<!--        tweet-user-username="@Selcuk"-->
<!--        tweet-created-date="11h"-->
<!--        tweet-user-img="https://pbs.twimg.com/profile_images/1155141513858433027/nJcIRDau_400x400.jpg"-->
<!--        tweet-text="-->
<!--#BayraktarTB2 S/İHA-->

<!--7/24 devam eden uçuş eğitimlerinden...-->

<!--#MilliTeknolojiHamlesi"-->
<!--        tweet-img="https://pbs.twimg.com/media/EoLHVqaXYAcny8X?format=jpg&name=large"-->
<!--        like-count="6.9k"-->
<!--        comment-count="946"-->
<!--        reply-count="2.1k"-->
<!--    ></Tweet>-->

<!--    <Tweet-->
<!--        tweet-user-name="Selçuk Bayraktar"-->
<!--        tweet-user-username="@Selcuk"-->
<!--        tweet-created-date="11h"-->
<!--        tweet-user-img="https://pbs.twimg.com/profile_images/1155141513858433027/nJcIRDau_400x400.jpg"-->
<!--        tweet-text="-->
<!--#BayraktarTB2 S/İHA-->

<!--7/24 devam eden uçuş eğitimlerinden...-->

<!--#MilliTeknolojiHamlesi"-->
<!--        tweet-img="https://pbs.twimg.com/media/EoLHVqaXYAcny8X?format=jpg&name=large"-->
<!--        like-count="6.9k"-->
<!--        comment-count="946"-->
<!--        reply-count="2.1k"-->
<!--    ></Tweet>-->

  </div>

  </div>
</template>

<script>
import ActionButton from "@/components/ActionButton";
import TwitterButton from "@/components/TwitterButton";
import Tweet from "@/components/Tweet";
import { methodsMixin } from "@/methodsMixin";

export default {
  mixins:[methodsMixin],
  components:{
    ActionButton,
    TwitterButton,
    Tweet
  },
  data(){
    return {
      user:this.$store.state.userForProfile
    }
  },
  methods:{
    tabClick(j){
      var tabElems = document.querySelectorAll(".a-profile-tab")
      for(var i = 0;i<4;i++){
        tabElems[i].style.color = "#5B7083"
        tabElems[i].style.borderBottom = "0px"
      }
      tabElems[j].style.color = "#1DA1F2"
      tabElems[j].style.borderBottom = "2px solid #1DA1F2"
    },
    zoomedProfileImage(){
      this.$store.state.zoomedImage = this.$store.state.userForProfile.profileImg
    },
    zoomedBannerImage(){
      this.$store.state.zoomedImage = this.$store.state.userForProfile.bannerImg
    }
  },
  created(){
    console.log(this.user.bio)
    this.user.bio = this.user.bio.replaceAll(this.$store.state.hashtagRegex,"<a href=" + "'#$1'>#$1</a>")
    this.user.bio = this.user.bio.replaceAll(this.$store.state.usernameRegex,"<a href=" + "'#$1'>@$1</a>")
    console.log(this.user.bio)
    this.restartTweets()
  }
}
</script>

<style>

.fixed-header-for-profile{
  position: sticky;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 55px;
  display: flex;
  padding: 0px;
  border: 1px solid #bfbfbf;
  border-top: 0px;
  background: white;
  z-index: 9999;
}

.fixed-header-for-profile span{
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}

.profile-root{
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
  .profile-root{
    width: 76.5%;
  }
}

.banner-img{
  width: 100%;
  height: 200px;
  cursor: pointer;
}

.profile-img{
  width: 140px;
  height: 140px;
  border-radius: 70px;
  padding: 0px;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.photo-and-buttons{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: auto;
}

.photo-and-buttons span.profile-buttons{
  width: 200px;
  display: flex;
  justify-content: space-between;
}

.profile-img img{
  width: 132px;
  height: 132px;
  border-radius: 66px;
  padding: 0px;
  margin: 0px;
}

.profile-section{
  padding: 0px 5px;
  position: relative;
  bottom: 95px;
  border: 1px solid #bfbfbf;
  border-top: 0px;
  border-bottom: 0px;
}

.user-tweet-count{
  color: #677580;
  font-weight: lighter;
}

.profile-section pre{
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  padding: 10px 0px 0px 0px !important;
  margin: 0px !important;
  line-height: 25px;
}

.f-and-f{
  margin: 15px 0px;
  display: inline-block;
}

.f-and-f .ff{
  margin: 0px 5px;
}

.f-and-f .ftext{
  color: #677580;
}

.some-info{
  display: block;
  color: #677580;
  margin: 5px 0px;
}

.some-info i{
  margin: 0px 10px;
}

.ff:hover{
  text-decoration: underline;
  cursor: pointer;
}

.profile-tabs{
  width: 100%;
  height: 50px;
  display: flex;
  color: #5B7083;
}

.a-profile-tab{
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
}

.a-profile-tab:first-child{
  color: #1DA1F2;
  border-bottom: 2px solid #1DA1F2;
}

.a-profile-tab:nth-child(1){
  width: 24%;
}

.a-profile-tab:nth-child(2){
  width: 32%;
}

.a-profile-tab:nth-child(3){
  width: 22%;
}

.a-profile-tab:nth-child(4){
  width: 22%;
}

.a-profile-tab:hover{
  color: #1da1f2;
  background: #E8F5FE;
  cursor: pointer;
}

</style>