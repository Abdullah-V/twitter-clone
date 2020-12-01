<template>
  <div id="app">

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
        <div class="title">Who to follow</div>
        <div class="users-container">
          <MiniUserProfile imgSrc="https://pbs.twimg.com/profile_images/1151410974240444416/yVvaD7hU_400x400.jpg" name="Recep Tayyip Erdoğan" username="@RTErdogan"></MiniUserProfile>
          <MiniUserProfile imgSrc="https://pbs.twimg.com/profile_images/1317884017333723138/3gyjyuL2_400x400.jpg" name="Ilham Eliyev" username="@azpresident"></MiniUserProfile>

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

export default {
  mixins:[methodsMixin],
  components:{
    Sidebar,
    MiniUserProfile
  },
  methods:{
    searchInputFocusEvent(){
      document.querySelector(".search-box").style.border = "1px solid #1DA1F2"
      document.querySelector(".search-icon").style.color = "#1DA1F2"
    },
    searchInputFocusOutEvent(){
      document.querySelector(".search-box").style.border = ""
      document.querySelector(".search-icon").style.color = ""
    }
  }
}
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
}

.more{
  border-radius: 0px 0px 10px 10px;
  color: #1DA1F2;
  cursor: pointer;
}

.users-container{
  height: auto;
  width: 86%;
}

</style>
