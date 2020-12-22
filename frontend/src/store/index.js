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

    newInfos:{
      name:"",
      mail:"",
      website:"",
      bio:"",
      location:"",
      profileImage:"",
      bannerImage:"",
    },

    newTweet:{
      text:"",
      image:"",
    },

    registerPage:false,
    addTweetPopup:false,
    editProfilePopup:false,
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
        _id:1,
        author:{
          name:"Selçuk Bayraktar",
          username:"@Selcuk",
          profileImage:"https://pbs.twimg.com/profile_images/1155141513858433027/nJcIRDau_400x400.jpg"
        },
        createdDate:"11h",
        text:"#BayraktarTB2 S/İHA \n\n 7/24 devam eden uçuş eğitimlerinden... \n\n #MilliTeknolojiHamlesi",
        tweetImage:"https://pbs.twimg.com/media/EoLHVqaXYAcny8X?format=jpg&name=large",
      likedUsers:[0,1,2,3,4,5,6,7,8],
        replies:[0,1,2,3,4],
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
