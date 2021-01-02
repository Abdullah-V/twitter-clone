<template>
  <div id="app">

    <Loader v-if="$store.state.isLoading"></Loader>


    <div class="image-zoomer" v-if="$store.state.zoomedImage">
      <span @click="closeZoomedImage()" class="image-close-icon">
        <i class="fas fa-times"></i>
      </span>
      <img style="max-height: 98%;max-width: 90%;border-radius: 10px" :src="$store.state.zoomedImage" alt="">
    </div>


    <EditProfilePopup v-if="$store.state.editProfilePopup"></EditProfilePopup>
    <AddTweetPopup v-if="$store.state.addTweetPopup"></AddTweetPopup>

    <div class="left-section" v-if="$store.state.userId">
      <Sidebar></Sidebar>
    </div>

    <router-view></router-view>


    <div class="right-section" v-if="$store.state.userId">
      <div class="search-box">
        <label for="asd" class="search-icon"><i class="fas fa-search"></i></label>
        <input  id="asd" @focusout="searchInputFocusOutEvent()" @focus="searchInputFocusEvent()" type="text" class="search-input" placeholder="Search on twitter">
      </div>

      <div class="who-to-follow">
        <div class="title"><span>Who to follow</span><ActionButton class="sett-acb" icon-class="fas fa-cog" default-color="#1DA1F2" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton></div>
        <div class="users-container">
          <MiniUserProfile imgSrc="https://randomuser.me/api/portraits/men/67.jpg" name="John Doe" username="@doejohn"></MiniUserProfile>
          <MiniUserProfile imgSrc="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" name="Abdullah" username="@abdullah2005"></MiniUserProfile>

        </div>
        <div class="more">Show more</div>
      </div>
    </div>



  </div>
</template>

<script>
import { methodsMixin } from "@/methodsMixin";
import Sidebar from "@/components/Sidebar";
import MiniUserProfile from "@/components/MiniUserProfile";
import AddTweetPopup from "@/components/AddTweetPopup";
import ActionButton from "@/components/ActionButton";
import EditProfilePopup from "@/components/EditProfilePopup";
import Loader from "@/components/Loader";
// import axios from "axios";

export default {
  mixins:[methodsMixin],
  components:{
    Sidebar,
    MiniUserProfile,
    AddTweetPopup,
    ActionButton,
    EditProfilePopup,
    Loader
},
  methods:{
    searchInputFocusEvent(){
      document.querySelector(".search-box").style.border = "1px solid #1DA1F2"
      document.querySelector(".search-icon").style.color = "#1DA1F2"
    },
    searchInputFocusOutEvent(){
      document.querySelector(".search-box").style.border = ""
      document.querySelector(".search-icon").style.color = ""
    },
    closeZoomedImage(){
      this.$store.state.zoomedImage = ""
    }
  },
  created() {
      console.log(process.env)
      console.log('app created')
      this.getTweetPage()
      this.getCurrentUser()
  },
  mounted:{
    deneme(){
      var zoomedImg = document.querySelector("image-zoomer img")
      var realWidth = zoomedImg.naturalWidth;
      var realHeight = zoomedImg.naturalHeight;
      zoomedImg.style.height = realHeight
      zoomedImg.style.width = realWidth
    }
  },
  '$route' (to, from) {
    document.title = to.meta.title || 'Your Website'
    console.log(from)
  }
}


/*
var moneys = [200,100,50,20,10,5,1]
function solution(amount,currentMoneys = []){
	var b = false
	moneys.forEach(money => {
  	if(((amount - money) >= 0) && b === false){
    	amount -= money
      currentMoneys.push(money)
      b = true
    }
  })
  if(amount === 0){
  	return currentMoneys
  }
  else{
  	return solution(amount,currentMoneys)
  }
}

console.log(solution(948))

// The solution of a problem that comes to mind :)


 */



</script>

<style>
#app{
  width: 100vw;
  height: 100vh;
}

.left-section{
  width: 23.5%;
  height: 100%;
  position: fixed;
  background: white;
  left: 0px;
  top: 0px;
  display: flex;
  padding-left: 47px;
}

.right-section{
  width: 25.5%;
  height: 100%;
  position: fixed;
  background: white;
  right: 0px;
  top: 0px;
  padding-left: 16px;
  padding-top: 10px;
}

@media screen and (max-width: 1000px){
  .right-section{
    display: none;
  }
  .left-section{
    padding-left: 0px;
  }
}

.search-box{
  width: 86%;
  height: 40px;
  border-radius: 20px;
  background: #ececec;
  display: flex;
  align-items: center;
  padding: 4px;
  cursor: pointer;
}

.search-input{
  width: 90%;
  height: 100%;
  border: 0px;
  background: transparent;
  margin-left: 5px;
  font-size: 18px;
  font-weight: lighter;
  padding-left: 9px;
}

.search-icon{
  padding-left: 5px;
  cursor: pointer;
  color: #98a5b1;
}

.who-to-follow{
  margin-top: 50px;
}

.title,
.more{
  width: 86%;
  height: 50px;
  padding-left: 15px;
  padding-top: 15px;
  background: #F7F9FA;
}

.title{
  color: black;
  border-radius: 10px 10px 0px 0px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 15px;
}


.more{
  border-radius: 0px 0px 10px 10px;
  color: #1DA1F2;
  cursor: pointer;
  transition: 200ms all;
}

.more:hover{
  background: #EFF1F2;
}

.users-container{
  height: auto;
  width: 86%;
}

.image-zoomer{
  position: absolute;
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 0px;
  background: rgba(0,0,0,.5);
  z-index: 999999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-close-icon i{
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: white;
  background: rgba(0,0,0,.6);
  border-radius: 20px;
  transition: 100ms all;
  font-size: 20px;
  cursor: pointer;
}

.image-close-icon i:hover{
  background: rgba(0,0,0,.3);
}

.image-close-icon i:active{
  background: rgba(0,0,0,.1);
}

</style>
