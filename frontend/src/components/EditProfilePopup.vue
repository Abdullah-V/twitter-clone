<template>
  <div class="edit-profile-popup-root">
    <div class="popup">
      <div class="fixed-popup-header">
        <span style="display: flex;align-items: center;justify-content: center">
          <ActionButton action="toggleEditProfilePopup" icon-class="fas fa-times" default-color="#1DA1F2" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton>
          <h2 style="padding-left: 20px">Edit profile</h2>
        </span>
        <TwitterButton click-event="updateUser" h="30px" w="70px" br="15px" text="Save" bgType="blue"></TwitterButton>
      </div>

      <div class="area-edit">
        <h4 style="margin: 10px 0px">Name</h4>
        <input v-model="$store.state.newInfos.name" type="text">
      </div>

<!--      <div class="area-edit">-->
<!--        <h4 style="margin: 10px 0px">Username</h4>-->
<!--        <input type="text">-->
<!--      </div>-->

      <div class="area-edit">
        <h4 style="margin: 10px 0px">Bio</h4>
        <textarea v-model="$store.state.newInfos.bio"></textarea>
      </div>

      <div class="area-edit">
        <h4 style="margin: 10px 0px">Profile image URL</h4>
        <input v-model="$store.state.newInfos.profileImage" type="text">
      </div>

      <div class="area-edit">
        <h4 style="margin: 10px 0px">Banner image URL</h4>
        <input v-model="$store.state.newInfos.bannerImage" type="text">
      </div>

      <div class="area-edit">
        <h4 style="margin: 10px 0px">Location</h4>
        <input v-model="$store.state.newInfos.location" type="text">
      </div>

      <div class="area-edit">
        <h4 style="margin: 10px 0px">Website</h4>
        <input v-model="$store.state.newInfos.website" type="text">
      </div>

      <div class="area-edit">
        <h4 style="margin: 10px 0px">E-mail</h4>
        <input v-model="$store.state.newInfos.mail" type="text">
      </div>

    </div>
  </div>
</template>

<script>
import ActionButton from "@/components/ActionButton";
import TwitterButton from "@/components/TwitterButton";

export default {
  components:{
    ActionButton,
    TwitterButton
  }
}
</script>

<style scoped>

.edit-profile-popup-root{
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  background: rgba(0,0,0,.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
}

.edit-profile-popup-root .popup{
  width: 60%;
  height: 88%;
  background: white;
  padding: 0px 10px 30px 10px;
  border-radius: 10px;
  overflow: auto;
}

.edit-profile-popup-root .popup .fixed-popup-header{
  width: 100%;
  height: 60px;
  padding: 0px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0px;
  left: 0px;
  background: white;
}

.edit-profile-popup-root .popup input{
  width: 100%;
  height: 55px;
  border-radius: 5px;
  border: 2px solid #c4cfd6;
  font-size: 21px;
}

edit-profile-popup-root .popup h5{
  color: #c4cfd6;
}

.edit-profile-popup-root .popup textarea{
  width: 100%;
  height: 100px;
  border-radius: 5px;
  border: 2px solid #c4cfd6;
  resize: none;
  font-size: 21px;
}

.edit-profile-popup-root .popup input:focus,
.edit-profile-popup-root .popup textarea:focus{
  border-color: #1da1f2;
}

.edit-profile-popup-root .popup .area-edit{
  margin: 20px 0px;
}

@media screen and (max-width: 600px){
  .edit-profile-popup-root .popup{
    width: 100%;
    height: 100%;
    border-radius: 0px;
  }
}

</style>