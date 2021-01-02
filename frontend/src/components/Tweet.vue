<template>
  <div class="tweet-root">

    <div v-if="tweetActionLVisible" class="tweet-actions-list">
      <div @click="removeTweet(infoForTweet._id)" v-if="infoForTweet.author._id === $store.state.currentUser._id" class="tweet-actions-list-item">
        <i style="color: #e0245e" class="fas fa-trash-alt"></i>
        <span style="color: #e0245e;">Delete tweet</span>
      </div>
      <div class="tweet-actions-list-item">
        <i class="fas fa-user-alt-slash"></i>
        Unfollow {{ infoForTweet.author.username }}
      </div>
      <div class="tweet-actions-list-item">
        <i class="far fa-list-alt"></i>
        Add/remove from lists
      </div>
      <div class="tweet-actions-list-item">
        <i class="fas fa-volume-mute"></i>
        Mute {{ infoForTweet.author.username }}
      </div>
      <div class="tweet-actions-list-item">
        <i class="fas fa-ban"></i>
        Block {{ infoForTweet.author.username }}
      </div>
      <div class="tweet-actions-list-item">
        <i class="fas fa-code"></i>
        Embed tweet
      </div>
      <div class="tweet-actions-list-item">
        <i class="fas fa-flag"></i>
        Report tweet
      </div>
    </div>


    <div class="retweet-actions-list" v-if="retweetActionVisible">
      <div class="tweet-actions-list-item">
        <i class="fas fa-retweet"></i>
        Retweet
      </div>
      <div class="tweet-actions-list-item">
        <i class="fas fa-pencil-alt"></i>
        Quote tweet
      </div>
    </div>


    <div class="action-list3" v-if="actionList3">
      <div class="tweet-actions-list-item">
        <i class="far fa-envelope"></i>
        Send via direct message
      </div>

      <div @click="addOrRemoveFromBookmarks(infoForTweet._id,false)" v-if="$store.state.currentUser.bookmarks.includes(infoForTweet._id)" class="tweet-actions-list-item">
        <i class="far fa-bookmark"></i>
        Remove tweet from bookmarks
      </div>
      <div @click="addOrRemoveFromBookmarks(infoForTweet._id,true)" v-else class="tweet-actions-list-item">
        <i class="far fa-bookmark"></i>
        Add tweet to bookmarks
      </div>

      <div class="tweet-actions-list-item">
        <i class="fas fa-link"></i>
        Copy link to tweet
      </div>
    </div>




    
    <div class="tweet-section1" @click.stop="rootClick()">
      <img :src="infoForTweet.author.profileImage || 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'" alt="">
    </div>

<!--    <span v-if="infoForTweet.parent">-->
<!--      <span v-if="infoForTweet.parent.author">-->
<!--        <span v-if="infoForTweet.parent.author.username">-->
<!--          {{ infoForTweet.parent.author.username }}-->
<!--        </span>-->
<!--      </span>-->
<!--    </span>-->

    <div class="tweet-section2" @click.stop="rootClick()">
      <div class="tweet-section2-header">
        <span class="header-sec1">
          <span @click.stop="$router.push({path:'/' + infoForTweet.author.username})" class="name">{{ infoForTweet.author.name }}</span>
          <span class="username">@{{ infoForTweet.author.username }}</span>
          <span class="uc">&#8226;</span>
          <span class="created-date">{{ infoForTweet.createdDate }}</span>

          <br>

           <span v-if="infoForTweet.parent">
      <span v-if="infoForTweet.parent.author">
        <span class="created-date">Replying to</span>
        <span @click.stop="$router.push({path:'/' + infoForTweet.parent.author.username})" class="link" v-if="infoForTweet.parent.author.username">
          @{{ infoForTweet.parent.author.username }}
        </span>
      </span>
    </span>

        </span>
        <span @click.stop="toggleTweetActionLVisible()" class="header-sec2"><ActionButton icon-class="fas fa-ellipsis-h" default-color="#5B7083" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton></span>
      </div>
      <div class="tweet-content">
        <div class="tweet-text" v-if="infoForTweet.text">
          <pre v-html="infoForTweet.text" v-if="infoForTweet.isDetailed" style="font-size: 25px;line-height: 30px"></pre>
          <pre v-html="infoForTweet.text" v-if="!infoForTweet.isDetailed"></pre>
        </div>
        <span v-if="infoForTweet.tweetImage">
          <img v-if="!infoForTweet.isDetailed && isImage()" @click.stop="makeZoomedImage()" class="tweet-img" :src="infoForTweet.tweetImage" alt="">
          <img style="height: 500px;" v-if="infoForTweet.isDetailed && isImage()" @click.stop="makeZoomedImage()" class="tweet-img" :src="infoForTweet.tweetImage" alt="">
        </span>
      </div>

<!--        <div style="width: 100%;height: 300px" v-if="!child">-->
<!--          <Tweet-->
<!--              child="true"-->
<!--              tweet-user-name="Selçuk Bayraktar"-->
<!--              tweet-user-username="@Selcuk"-->
<!--              tweet-created-date="11h"-->
<!--              tweet-user-img="https://pbs.twimg.com/profile_images/1155141513858433027/nJcIRDau_400x400.jpg"-->
<!--              tweet-text="-->
<!--#BayraktarTB2 S/İHA-->

<!--7/24 devam eden uçuş eğitimlerinden...-->

<!--#MilliTeknolojiHamlesi"-->
<!--              like-count="6.9k"-->
<!--              comment-count="946"-->
<!--              reply-count="2.1k"-->
<!--          ></Tweet>-->
<!--        </div>-->

      <div class="tweet-action-buttons">
        <span @click.stop="replieTweet()" class="with-count">
          <ActionButton iconClass="far fa-comment"  default-color="#5B7083" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton>
          <span class="count">{{ infoForTweet.replies.length }}</span>
        </span>
        <span class="with-count" @click.stop="toggleRetweetActionVisible()">
          <ActionButton iconClass="fas fa-retweet"  default-color="#5B7083" hover-color="#17BF63" hover-bg="#E0F2E8"></ActionButton>
          <span class="count">{{ infoForTweet.commentCount }}</span>
        </span>
        <span v-if="!$store.state.currentUser.likedTweets.includes(infoForTweet._id)" @click.stop="likeTweet()" class="with-count">
        <ActionButton iconClass="far fa-heart"  default-color="#5B7083" hover-color="#E0245E" hover-bg="#F5E1E7"></ActionButton>
          <span class="count">{{ infoForTweet.likedUsers.length }}</span>
        </span>
        <span v-if="$store.state.currentUser.likedTweets.includes(infoForTweet._id)" @click.stop="unLikeTweet()" class="with-count">
        <ActionButton iconClass="fas fa-heart"  default-color="#e0245e" hover-color="#e0245e" hover-bg="#F5E1E7"></ActionButton>
          <span class="count">{{ infoForTweet.likedUsers.length }}</span>
        </span>
        <span @click.stop="toggleActionList3()">
          <ActionButton iconClass="fas fa-upload"  default-color="#5B7083" hover-color="#1DA1F2" hover-bg="#E8F5FE"></ActionButton>
        </span>
      </div>
      <span class="f-and-f" v-if="infoForTweet.isDetailed">
        <span class="ff"><b>{{ infoForTweet.retweeters.length }}</b> <span class="ftext">Retweet</span></span>
        <span style="padding: 0px 20px" class="ff"><b>{{ infoForTweet.likedUsers.length }}</b> <span class="ftext">Likes</span></span>
      </span>
    </div>

  </div>
</template>

<script>
import ActionButton from "@/components/ActionButton";
import { methodsMixin } from "@/methodsMixin";
// import axios from "axios";

export default {
  mixins:[methodsMixin],
  name:"Tweet",
  props:["infoForTweet","isDetailed","child"],
  components:{
    ActionButton
  },
  data(){
    return{
      urlRegex: new RegExp('(https?:\\/\\/)|(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', 'ig'),
      tweetActionLVisible:false,
      retweetActionVisible:false,
      actionList3:false,
    }
  },
  mounted() {
    var r = this.infoForTweet.text.replaceAll(this.$store.state.hashtagRegex,"<a class='link' href=" + "'#'>#$1</a>")
    r = r.replaceAll(this.$store.state.usernameRegex,"<a class='link' href='/$1'>@$1</a>")
    this.infoForTweet.text = r

  },
  methods:{
    // remtwe(){
    //   this.$store.state.isLoading = true
    //   axios.post(,{
    //     tweetId:this.infoForTweet._id
    //   })
    //       .then(result => {
    //         console.log(result.data)
    //         this.$store.state.isLoading = false
    //       })
    // },
    toggleTweetActionLVisible(){
      this.actionList3 = false
      this.retweetActionVisible = false
      this.tweetActionLVisible = !this.tweetActionLVisible
      console.log('three dot action clicked')
    },
    toggleRetweetActionVisible(){
      this.actionList3 = false
      this.tweetActionLVisible = false
      this.retweetActionVisible = !this.retweetActionVisible
    },
    toggleActionList3(){
      console.log('action 3')
      this.retweetActionVisible = false
      this.tweetActionLVisible = false
      this.actionList3 = !this.actionList3
    },
    makeZoomedImage(){
      this.$store.state.zoomedImage = this.infoForTweet.tweetImage
      console.log('tweet image clicked')
    },
    rootClick(){
      if(this.infoForTweet.isDetailed){
        return
      }
      console.log('tweet root clicked')
      var redirectedPath = "/" + this.infoForTweet.author.username + "/tweets/" + this.infoForTweet._id
      this.$router.push({path:redirectedPath})
    },
    isImage(){
      if(this.infoForTweet.tweetImage.match(this.urlRegex)){
        return true
      }
    },
    likeTweet(){
      this.likeOrUnlike(this.infoForTweet._id,true)
      this.infoForTweet.likedUsers.push(this.$store.state.currentUser._id)
    },
    unLikeTweet(){
      this.likeOrUnlike(this.infoForTweet._id,false)
      this.infoForTweet.likedUsers.splice(this.infoForTweet.likedUsers.indexOf(this.$store.state.currentUser._id),1)
    },
    replieTweet(){
      this.$store.state.repliedTweet = this.infoForTweet
      this.$store.state.addTweetPopup = true
    }
  }
}
</script>

<style>

.tweet-root{
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px 10px;
  background: white;
  border-bottom: 1px solid #bfbfbf;
  border-right: 1px solid #bfbfbf;
  border-left: 1px solid #bfbfbf;
  transition: 200ms all;
  cursor: pointer;
  position: relative;
}

.tweet-root:hover{
  background: #F7F7F7;
}

.tweet-text{
  width: 100%;
}

.tweet-text pre{
  line-height: 23px;
  font-weight: lighter;
  font-family: Arial;
  font-size: 18px;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
}

.count{
  color: #5B7083;
}

.with-count{
  display: flex;
  align-items: center;
}

.tweet-root .tweet-section1 img{
  width: 50px;
  height: 50px;
  border-radius: 25px;
}

.tweet-section2{
  display: flex;
  flex-direction: column;
  width: 90%;
}

.tweet-section2-header{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.tweet-img{
  width: 100%;
  height: 300px;
  border-radius: 17px;
  margin: 20px 0px;
}

.header-sec1 .name{
  font-weight: bold;
}

.header-sec1 .username,.created-date,.uc{
  color: #5B7083;
  padding: 0px 4px;
}

.name:hover{
  text-decoration: underline;
}

.tweet-content{
  font-size: 16px;
  width: 100%;
}

.tweet-action-buttons{
  display: flex;
  justify-content: space-between;
  width: 80%;
}


.tweet-actions-list{
  width: 210px;
  height: auto;
  background:white;
  position:absolute;
  right: 70px;
  z-index: 9;
}

.tweet-actions-list-item{
  height: 50px;
  width: 100%;
  padding: 0px 8px;
  display: flex;
  align-items: center;
  transition: 300ms all;
}

.tweet-actions-list-item i{
  margin: 0px 6px;
  color: #5B7083;
}

.tweet-actions-list-item:hover{
  background: #ececec;
}

.retweet-actions-list{
  z-index: 9;
  width: 150px;
  height: auto;
  background: white;
  position: absolute;
  left: 70px;
  bottom: 60px;
}

.action-list3{
  z-index: 9;
  width: 240px;
  height: auto;
  background: white;
  position: absolute;
  right: 183px;
  bottom: 60px;
}

</style>