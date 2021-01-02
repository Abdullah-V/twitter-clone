<template>
  <div class="profile-root">
    <div class="fixed-header-for-profile">
      <ActionButton action="goToBack" icon-class="fas fa-arrow-left" default-color="#1DA1F2" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton>
      <span>
         <h2>{{ $store.state.userForProfile.name }}</h2>
        <h5 class="user-tweet-count">{{ $store.state.userForProfile.tweets.length }} tweet</h5>
      </span>
    </div>
    <img @click.stop="zoomedBannerImage()" class="banner-img" :src="bannerImage()" alt="">
    <div class="profile-section">
      <div class="photo-and-buttons">
        <div class="profile-img">
          <img @click="zoomedProfileImage()" :src="profilePhoto()" alt="">
        </div>
        <TwitterButton click-event="toggleEditProfilePopup" v-if="$store.state.userForProfile.username === $store.state.currentUser.username" h="40px" w="115px" br="20px" text="Edit Profile" bgType="white"></TwitterButton>
        <span v-if="$store.state.userForProfile.username !== $store.state.currentUser.username" class="profile-buttons">

              <TwitterButton v-if="$store.state.currentUser.following.includes($store.state.userForProfile._id)" h="40px" w="40px" br="20px" text="<i class='fas fa-ellipsis-h'></i>" bgType="white"></TwitterButton>
              <TwitterButton v-if="$store.state.currentUser.following.includes($store.state.userForProfile._id)"  h="40px" w="40px" br="20px" text="<i class='far fa-bell'></i>" bgType="white"></TwitterButton>
              <FollowUnfollowButton v-if="$store.state.currentUser.following.includes($store.state.userForProfile._id)"></FollowUnfollowButton>
            <span v-if="!$store.state.currentUser.following.includes($store.state.userForProfile._id)" @click="followOrUnfollow(true)">
              <TwitterButton h="40px" w="105px" br="20px" text="Follow" bgType="white"></TwitterButton>
            </span>
        </span>
      </div>
      <h2>{{ $store.state.userForProfile.name }}</h2>
      <h4 class="user-tweet-count">@{{ $store.state.userForProfile.username }}</h4>

      <pre v-html="$store.state.userForProfile.bio"></pre>

      <span class="some-info" v-if="$store.state.userForProfile.location"><i class="fas fa-map-marker-alt"></i><span>{{ $store.state.userForProfile.location }}</span></span>
      <span class="some-info" v-if="$store.state.userForProfile.mail"><i class="fas fa-envelope"></i><a :href="'mailto:' + $store.state.userForProfile.mail">{{ $store.state.userForProfile.mail }}</a></span>
      <span class="some-info" v-if="$store.state.userForProfile.website"><i class="fas fa-link"></i><a :href="$store.state.userForProfile.website">{{ $store.state.userForProfile.website }}</a></span>
      <span class="some-info"><i class="far fa-calendar-alt"></i><span>Joined {{ $store.state.userForProfile.joinedDate }}</span></span>

      <span class="f-and-f">
        <span class="ff"><b>{{ $store.state.userForProfile.following.length }}</b> <span class="ftext">Following</span></span>
        <span class="ff"><b>{{ $store.state.userForProfile.followers.length }}</b> <span class="ftext">Followers</span></span>
      </span>

      <div class="profile-tabs">
        <div class="a-profile-tab" @click="tabClick(0)">Tweets</div>
        <div class="a-profile-tab" @click="tabClick(1)">Tweets & replies</div>
        <div class="a-profile-tab" @click="tabClick(2)">Media</div>
        <div class="a-profile-tab" @click="tabClick(3)">Likes</div>
      </div>

    </div>


    <div style="position: relative;bottom: 95px">
      <div v-for="(tweet,index) in $store.state.userForProfile.tweets" :key="index">
        <Tweet :info-for-tweet="tweet"></Tweet>
      </div>
<!--      <Tweet :info-for-tweet="$store.state.tweets[0]"></Tweet>-->
  </div>

<!--    {{ $store.state.userForProfile.tweets }}-->

  </div>
</template>

<script>
import ActionButton from "@/components/ActionButton";
import TwitterButton from "@/components/TwitterButton";
import Tweet from "@/components/Tweet";
import { methodsMixin } from "@/methodsMixin";
import axios from "axios";
import FollowUnfollowButton from "@/components/FollowUnfollowButton";

export default {
  mixins:[methodsMixin],
  components:{
    ActionButton,
    TwitterButton,
    Tweet,
    FollowUnfollowButton
  },
  data(){
    return {
      urlRegex: new RegExp('(https?:\\/\\/)|(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', 'ig'),
    }
  },
  methods:{
    image(u){
      if(u.match(this.urlRegex)){
        return u
      }
      else{
        return ""
      }
    },
    bannerImage(){
      if(this.$store.state.userForProfile.bannerImage && this.$store.state.userForProfile.bannerImage.match(this.urlRegex)){
        return this.$store.state.userForProfile.bannerImage
      }
      else{
        return "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
      }
    },
    profilePhoto(){
      if(this.$store.state.userForProfile.profileImage && this.$store.state.userForProfile.profileImage.match(this.urlRegex)){
        return this.$store.state.userForProfile.profileImage
      }
      else{
        return "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
      }
    },
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
      this.$store.state.zoomedImage = this.$store.state.userForProfile.profileImage
    },
    zoomedBannerImage(){
      this.$store.state.zoomedImage = this.$store.state.userForProfile.bannerImage
    }
  },
  created(){
    // console.log(this.$store.state.userForProfile.bio)
    this.$store.state.userForProfile.bio = this.$store.state.userForProfile.bio.replaceAll(this.$store.state.hashtagRegex,"<a href=" + "'#$1'>#$1</a>")
    this.$store.state.userForProfile.bio = this.$store.state.userForProfile.bio.replaceAll(this.$store.state.usernameRegex,"<a href=" + "'#$1'>@$1</a>")
    this.restartTweets()
  },
  watch:{
    '$route'(newValue,oldValue){
      console.log(oldValue)
      // if(newValue.params.username === this.$store.state.currentUser.username){
      //   this.$store.state.userForProfile = this.$store.state.currentUser
      // }
        axios.post(`${process.env.VUE_APP_API_BASE_URL}/getuserwithdetails`,{
          username:newValue.params.username,
        })
            .then(async (result) => {
              this.$store.state.userForProfile = await result.data
            })
      }
  },
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
  z-index: 9;
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
  width: auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: auto;
}

.photo-and-buttons span.profile-buttons{
  width: auto;
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