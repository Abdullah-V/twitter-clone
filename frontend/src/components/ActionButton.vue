<template>
  <i class="actionButton" :style="styleObject" :class="iconClass"></i>
</template>

<script>
export default {
  props:["iconClass","defaultColor","hoverBg","hoverColor"],
  computed:{
    styleObject(){
      return {
        '--defaultColor':this.defaultColor,
        '--hoverBg':this.hoverBg,
        '--hoverColor':this.hoverColor
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
}

.actionButton:hover{
  background: var(--hoverBg);
  color: var(--hoverColor);
}

</style>