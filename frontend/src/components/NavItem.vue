<template>
    <router-link :to="path" tag="span" class="navitem-root" active-class="active" exact>
        <span class="navitem-icon" >
          <i :class="icon"></i>
        </span>
        <span class="navitem-text">{{ text }}</span>
    </router-link>
</template>

<script>
export default {
  props:["icon","text","path"]
}
</script>

<style scoped>

.navitem-root{
  padding: 11px 7px;
  color: black;
  background: white;
  transition: 100ms all;
  font-size: 23px;
  border-radius: 22px;
  cursor: pointer;
  font-weight: bold;
  display: inline-block;
}

.navitem-root:hover{
  background: #E8F5FE;
  color: #1DA1F2;
}

.active{
  color: #1da1f2;
  font-weight: bolder;
}

.navitem-icon{
  margin: 0px 12px;
}

@media screen and (max-width: 1300px){
  .navitem-text{
    display: none;
  }
}

</style>