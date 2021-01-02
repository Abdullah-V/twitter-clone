<template>
  <div class="sidebar-root">

    <i style="color: #1DA1F2;font-size: 36px;margin: 10px 17px" class="fab fa-twitter"></i>

    <NavItem exact text="Home" path="/home" icon="fas fa-home"></NavItem>
    <NavItem text="Explore" path="##" icon="fas fa-hashtag"></NavItem>
    <NavItem text="Notifications" path="###" icon="far fa-bell"></NavItem>
    <NavItem text="Messages" path="####" icon="far fa-envelope"></NavItem>
    <NavItem text="Bookmarks" path="/bookmarks" icon="far fa-bookmark"></NavItem>
    <NavItem text="Lists" path="######" icon="far fa-list-alt"></NavItem>
    <NavItem text="Profile" :path="'/' + $store.state.currentUser.username" icon="far fa-user"></NavItem>
    <NavItem text="More" path="########" icon="fas fa-ellipsis-h"></NavItem>
      <div style="margin: 6px 0px"></div>
    <TwitterButton click-event="openAddTweetPopup" class="tb" h="54px" w="240px" br="27px" text="Tweet" bgType="blue"></TwitterButton>
    <TwitterButton click-event="openAddTweetPopup" h="60px" w="60px" br="30px" bg-type="blue" class="media-query-btn" text="<i class='fas fa-feather-alt'></i>"></TwitterButton>


    <div @click="toggleLogoutDiv()" class="current-user-mini-profile">

      <div @click.stop="logout()" v-if="logoutDiv" class="logout">
        <b>Logout @{{ $store.state.currentUser.username }}</b>
      </div>

      <img :src="$store.state.currentUser.profileImage || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'" alt="">
      <span>
        <span><b>{{ $store.state.currentUser.name }}</b></span>
        <span>@{{ $store.state.currentUser.username }}</span>
      </span>
      <span><i class="fas fa-ellipsis-h"></i></span>
    </div>

  </div>
</template>

<script>
import NavItem from "@/components/NavItem";
import TwitterButton from "@/components/TwitterButton";
import { methodsMixin } from "@/methodsMixin";

export default {
  mixins:[methodsMixin],
  data(){
    return {
      logoutDiv:false
    }
  },
  methods:{
    toggleLogoutDiv(){
      this.logoutDiv = !this.logoutDiv
    }
  },
  components:{
    NavItem,
    TwitterButton
  }
}
</script>

<style scoped>

.logout{
  height: 62px;
  width: 210px;
  padding: 20px;
  border-radius: 6px;
  position: absolute;
  background: #e2e2e2;
  bottom: 120px;
  display: flex;
  align-items: center;
  left: 44px;
  transition: 200ms all;
}

.logout:hover{
  background: #ececec;
}

.current-user-mini-profile{
  width: 107%;
  height: 64px;
  background: white;
  margin: auto;
  border-radius: 32px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1px;
  cursor: pointer;
  transition: 300ms all;
}

.current-user-mini-profile img{
  width: 52px;
  height: 52px;
  border-radius: 26px;
}

.current-user-mini-profile span:nth-child(1){
  display: flex;
  flex-direction: column;
}

.current-user-mini-profile span span:nth-child(2),
.current-user-mini-profile i{
  color: #5B7083;
}

.current-user-mini-profile:hover{
  background: #E8F5FE;
}

.sidebar-root{
  display: flex;
  flex-direction: column;
}

.media-query-btn{
  background: #1da1f2;
  color: white;
  border: 0px;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  font-size: 22px;
  transition: 300ms all;
  display: none;
}

.media-query-btn:hover{
  background: #1A91DA;
}

@media screen and (max-width: 1300px){
  .sidebar-root{
    justify-content: center;
    align-items: center;
    width: 100%;
  }
  .media-query-btn{
    display: block;
  }
  .tb{
    display: none;
  }
}

</style>