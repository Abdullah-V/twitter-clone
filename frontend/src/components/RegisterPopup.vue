<template>
  <div class="register-popup-root">
    <div class="popup">

      <div class="popup-header">
        <TwitterButton clickEvent="toggleRegisterPage" h="30px" w="70px" br="15px" text="Geri" bgType="white"></TwitterButton>
        <i style="color: #1DA1F2;font-size: 30px" class="fab fa-twitter"></i>
        <TwitterButton clickEvent="register" h="30px" w="70px" br="15px" text="İleri" bgType="blue"></TwitterButton>
      </div>

      <div class="popup-content">
        <h2>Hesabını oluştur</h2>
        <h3 v-if="$store.state.registerErrors" style="margin: 10px 0px;color: #ef3615">{{ $store.state.registerErrors }}</h3>
        <div class="custom-input">
          <div>Name</div>
          <input v-model="$store.state.registerNameModel" @focusout="focusOutEvent(0)" @focus="focusEvent(0)" type="text">
        </div>

        <div class="custom-input">
          <div>Username</div>
          <input v-model="$store.state.registerUsernameModel" @focusout="focusOutEvent(1)" @focus="focusEvent(1)" type="text">
        </div>

        <div class="custom-input">
          <div>Password</div>
          <input v-model="$store.state.registerPasswordModel" @focusout="focusOutEvent(2)" @focus="focusEvent(2)" type="password">
        </div>

        <div class="custom-input">
          <div>E-mail</div>
          <input v-model="$store.state.registerEmailModel" @focusout="focusOutEvent(3)" @focus="focusEvent(3)" type="text">
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { methodsMixin } from "@/methodsMixin";
import TwitterButton from "@/components/TwitterButton";

export default {
  mixins:[methodsMixin],
  components:{
    TwitterButton
  },
}
</script>

<style scoped>

.register-popup-root{
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup{
  width: 50%;
  min-height: 60%;
  height: auto;
  background: white;
  padding: 10px 18px;
  opacity: 1;
  border-radius: 20px;
}

.popup-header{
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.popup-content{
  margin-top: 30px;
}

.custom-input{
  background: #f7f9fa;
  width: 100%;
  height: 60px;
  margin: 20px 0px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 2px solid #5b7083;
}

.custom-input input{
  height: 100%;
  background: transparent;
  border: 0px;
  font-size: 21px;
}

.custom-input div{
  color: #5b7083;
}




</style>