<template>
  <div class="login-root">
    <i style="color: #1DA1F2;font-size: 38px;margin: 30px 0px;" class="fab fa-twitter"></i>
    <h2>Twitter'a giriş yap</h2>

    <div class="custom-input">
      <div>İsim veya e-posta</div>
      <input @focusout="focusOutEvent(0)" @focus="focusEvent(0)" type="text">
    </div>

    <div class="custom-input">
      <div>Şifre</div>
      <input @focusout="focusOutEvent(1)" @focus="focusEvent(1)" type="password">
    </div>

    <TwitterButton clickEvent="loginUser" h="54px" w="540px" br="27px" text="Giriş yap" bgType="blue"></TwitterButton>

  </div>
</template>

<script>
import { methodsMixin } from "@/methodsMixin";
import TwitterButton from "@/components/TwitterButton";

export default {
  mixins:[methodsMixin],
  components:{
    TwitterButton
  }
}
</script>

<style scoped>

.login-root{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.custom-input{
  background: #f7f9fa;
  width: 40%;
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