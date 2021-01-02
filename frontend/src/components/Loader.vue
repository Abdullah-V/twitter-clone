<template>
  <div class="loader-root">
    <div class="loader">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>

.loader-root {
  background: rgba(30, 30, 30, 0.6);
  width: 100%;
  height: 100%;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999999;
  position: absolute;
}

.loader {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.loader .bar {
  width: 10px;
  height: 5px;
  background: #1A91DA;
  margin: 2px;
  animation: bar 1s infinite linear;
}

.loader .bar:nth-child(1) {
  animation-delay: 0s;
}

.loader .bar:nth-child(2) {
  animation-delay: 0.25s;
}

.loader .bar:nth-child(3) {
  animation-delay: 0.5s;
}

@keyframes bar {
  0% {
    transform: scaleY(1) scaleX(0.5);
  }

  50% {
    transform: scaleY(10) scaleX(1);
  }

  100% {
    transform: scaleY(1) scaleX(0.5);
  }
}


</style>