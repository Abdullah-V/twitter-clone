import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    registerPage:false,
    addTweetPopup:false,
    userId:"asdad",
    hashtagRegex:/(?:(?<=\s)|^)#(\w*[A-Za-z_ğüşıöçĞÜŞİÖÇ]+\w*)/gi,
    usernameRegex:/(?:(?<=\s)|^)@(\w*[A-Za-z_ğüşıöçĞÜŞİÖÇ]+\w*)/gi,

    zoomedImage:"",

    userForProfile:{
      name:"Selcuk Bayraktar",
      username:"Selcuk",
      joined:"January 24",
      mail:"selcuk@bayraktar.com",
      location:"Istanbul",
      website:"baykarsavunma.com",
      bio:"@Baykar_Savunma" +
          " Teknik Müdür/CTO\n" +
          "@T3Vakfi" +
          " Mütevelli Heyeti Başkanı.\n" +
          "Motto: Bin Atlı Akınlarda Çocuklar gibi Şendik!\n" +
          "<a href='#'>http://instagram.com/selcuk79</a>",
      profileImg:"https://pbs.twimg.com/profile_images/1155141513858433027/nJcIRDau_400x400.jpg",
      bannerImg:"https://pbs.twimg.com/profile_banners/2271763025/1598131465/1500x500",
    }

  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
