import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginUsernameOrEmailModel:"",
    loginPasswordModel:"",
    loginErrors:null,

    registerUsernameModel:"",
    registerNameModel:"",
    registerPasswordModel:"",
    registerEmailModel:"",
    registerErrors:"",

    registerPage:false,
    addTweetPopup:false,
    userId:localStorage.getItem('userId'),
    hashtagRegex:/(?:(?<=\s)|^)#(\w*[A-Za-z_ğüşıöçĞÜŞİÖÇ]+\w*)/gi,
    usernameRegex:/(?:(?<=\s)|^)@(\w*[A-Za-z_ğüşıöçĞÜŞİÖÇ]+\w*)/gi,

    zoomedImage:"",

    currentUser:{},

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
    },

    tweetForDetail:{},





















    // TRIAL ====>

    tweets:[
      {
        tweetId:1,
        tweetUserName:"Selçuk Bayraktar",
        tweetUserUsername:"@Selcuk",
        tweetCreatedDate:"11h",
        tweetUserImg:"https://pbs.twimg.com/profile_images/1155141513858433027/nJcIRDau_400x400.jpg",
        tweetText:"#BayraktarTB2 S/İHA \n\n 7/24 devam eden uçuş eğitimlerinden... \n\n #MilliTeknolojiHamlesi",
      tweetImg:"https://pbs.twimg.com/media/EoLHVqaXYAcny8X?format=jpg&name=large",
      likeCount:"6.9k",
      commentCount:"946",
      replyCount:"2.1k",
      },
      {
        tweetId:2,
        tweetUserName:"Selçuk Bayraktar",
        tweetUserUsername:"@Selcuk",
        tweetCreatedDate:"11h",
        tweetUserImg:"https://pbs.twimg.com/profile_images/1155141513858433027/nJcIRDau_400x400.jpg",
        tweetText:"#BayraktarTB2 S/İHA \n\n 7/24 devam eden uçuş eğitimlerinden... \n\n #MilliTeknolojiHamlesi",
        tweetImg:"https://pbs.twimg.com/media/EoLHVqaXYAcny8X?format=jpg&name=large",
        likeCount:"6.9k",
        commentCount:"946",
        replyCount:"2.1k",
      },
    ]























  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
