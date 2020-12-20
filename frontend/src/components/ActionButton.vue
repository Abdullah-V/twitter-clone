<template>
  <span>
    <i @click="handleAction()" class="actionButton" :style="styleObject" :class="iconClass"></i>
  </span>
</template>

<script>
import { methodsMixin } from "@/methodsMixin";

export default {
  mixins:[methodsMixin],
  props:["action","iconClass","defaultColor","hoverBg","hoverColor"],
  computed:{
    styleObject(){
      return {
        '--defaultColor':this.defaultColor,
        '--hoverBg':this.hoverBg,
        '--hoverColor':this.hoverColor
      }
    }
  },
  methods:{
    handleAction(){
      try{
        this[this.action]("deneme parametr action button component")
      }catch (e){
        console.log(`Error in ActionButton components 'handleAction' method:\n ${e}`)
      }
    }
  }
}
</script>

<style scoped>

.actionButton{
  color: var(--defaultColor);
  padding: 15px;
  border-radius: 30px;
  transition: 200ms all;
  cursor: pointer;
  font-size: 18px;
}

.actionButton:hover{
  background: var(--hoverBg);
  color: var(--hoverColor);
}


</style>