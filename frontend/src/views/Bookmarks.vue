<template>
  <div class="bookmarks-page-root">
    <div class="fixed-header-for-bookmarks-page">
      <span>
        <h2>Bookmarks</h2>
        <h5 style="
        color: #677580;
        font-weight: lighter;">
          @{{ $store.state.currentUser.username }}
        </h5>
      </span>

      <ActionButton icon-class="fas fa-ellipsis-h" default-color="#1DA1F2" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton>
    </div>

    <div v-for="tweet in $store.state.bookmarks" :key="tweet">
      <Tweet :info-for-tweet="tweet"></Tweet>
    </div>

  </div>
</template>

<script>
import ActionButton from "@/components/ActionButton";
import Tweet from "@/components/Tweet";

export default {
  components:{
    ActionButton,
    Tweet
  }
}
</script>

<style scoped>

.fixed-header-for-bookmarks-page{
  position: sticky;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  border: 1px solid #bfbfbf;
  border-top: 0px;
  background: white;
  z-index: 9;
}

.fixed-header-for-bookmarks-page span{
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}


.bookmarks-page-root{
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
  .bookmarks-page-root{
    width: 76.5%;
  }
}









</style>