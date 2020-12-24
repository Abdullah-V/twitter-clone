<template>
  <div class="follow-unfollow-button-root">
    <button @click="followOrUnfollow(false)">
      <span class="first">Following</span>
      <span class="second">Unfollow</span>
    </button>
  </div>
</template>

<script>
import { methodsMixin } from "@/methodsMixin";

export default {
  mixins:[methodsMixin]
}
</script>

<style scoped>

.follow-unfollow-button-root button .second{
  display: none;
}

.follow-unfollow-button-root button .second,
.follow-unfollow-button-root button .first{
  color: white;
}

.follow-unfollow-button-root button{
  width: 100px;
  height: 40px;
  border-radius: 20px;
  background: #1da1f2;
  outline: none;
  font-weight: bolder;
  font-size: 17px;
  transition: 300ms all;
  cursor: pointer;
  border: 0px;
}

.follow-unfollow-button-root button:hover{
  background: #CA2055;
}

.follow-unfollow-button-root button:hover .first{
  display: none;
}

.follow-unfollow-button-root button:hover .second{
  display: block;
}

</style>