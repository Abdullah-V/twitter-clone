<template>
  <div class="sidebar-root">

    <i style="color: #1DA1F2;font-size: 36px;margin: 10px 17px" class="fab fa-twitter"></i>

    <NavItem text="Home" path="/home" icon="fas fa-home"></NavItem>
    <NavItem text="Explore" path="##" icon="fas fa-hashtag"></NavItem>
    <NavItem text="Notifications" path="###" icon="far fa-bell"></NavItem>
    <NavItem text="Messages" path="####" icon="far fa-envelope"></NavItem>
    <NavItem text="Bookmarks" path="#####" icon="far fa-bookmark"></NavItem>
    <NavItem text="Lists" path="######" icon="far fa-list-alt"></NavItem>
    <NavItem text="Profile" path="#######" icon="far fa-user"></NavItem>
    <NavItem text="More" path="########" icon="fas fa-ellipsis-h"></NavItem>
      <div style="margin: 6px 0px"></div>
    <TwitterButton click-event="toggleAddTweetPopup" class="tb" h="54px" w="240px" br="27px" text="Tweet" bgType="blue"></TwitterButton>
    <TwitterButton click-event="toggleAddTweetPopup" h="60px" w="60px" br="30px" bg-type="blue" class="media-query-btn" text="<i class='fas fa-feather-alt'></i>"></TwitterButton>

  </div>
</template>

<script>
import NavItem from "@/components/NavItem";
import TwitterButton from "@/components/TwitterButton";

export default {
  components:{
    NavItem,
    TwitterButton
  }
}
</script>

<style scoped>

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