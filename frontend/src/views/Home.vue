<template>
  <div class="home-root">

    <div class="main-section">
      <div class="trial-div"></div>
      <div class="trial-div"></div>
      <div class="trial-div"></div>
      <div class="trial-div"></div>
      <div class="trial-div"></div>
      <div class="trial-div"></div>
      <div class="trial-div"></div>
      <div class="trial-div"></div>
      <div class="trial-div"></div>
      <div class="trial-div"></div>
    </div>

  </div>
</template>

<script>
export default {

}
</script>

<style scoped>

.trial-div{
  width: 100%;
  height: 300px;
  background: #fafafa;
  border: 1px solid #bfbfbf;
  transition: 200ms all;
  scroll-behavior: smooth;
}

.trial-div:hover{
  background: #ececec;
}

/*  #f1f1f1 */

.main-section{
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
  .main-section{
    width: 76.5%;
  }
}


</style>