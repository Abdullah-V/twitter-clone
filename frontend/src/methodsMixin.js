import axios from 'axios'
// import router from "@/router";

const http = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
})


export var methodsMixin = {
    methods:{
        toggleRegisterPage(){
            this.$store.state.registerPage = !this.$store.state.registerPage
        },
        focusEvent(i){
            document.querySelectorAll(".custom-input")[i].style.borderBottom = "2px solid #1da1f2"
            document.querySelectorAll(".custom-input div")[i].style.color = "#1da1f2"
        },
        focusOutEvent(i){
            document.querySelectorAll(".custom-input")[i].style.borderBottom = "2px solid #5b7083"
            document.querySelectorAll(".custom-input div")[i].style.color = ""
        },
        logout(){
            localStorage.removeItem('userId')
            this.$store.state.userId = null
            this.$router.push({path:"/"})
        },
        loginUser(){
            if(this.$store.state.loginPasswordModel.trim() && this.$store.state.loginUsernameOrEmailModel.trim()){
                http.post('/login',{
                    usernameOrEmail: this.$store.state.loginUsernameOrEmailModel.trim(),
                    password: this.$store.state.loginPasswordModel.trim()
                })
                    .then(result => {
                        if(result.data.foundUser){
                            this.$store.state.currentUser = result.data.foundUser
                            this.$store.state.loginErrors = ""
                            localStorage.setItem('userId',result.data.foundUser.username)
                            this.$store.state.userId = result.data.foundUser.username
                            this.$router.push({path:"/home"})
                            this.$store.state.loginUsernameOrEmailModel = ""
                            this.$store.state.loginPasswordModel = ""
                        }
                        else{
                            this.$store.state.loginErrors = "Username or password is wrong"
                        }
                    })
            }
            else{
                this.$store.state.loginErrors = "Please fill the all gaps"
            }

        },
        register(){
            var username = this.$store.state.registerUsernameModel.trim()
            var password = this.$store.state.registerPasswordModel.trim()
            var name = this.$store.state.registerNameModel.trim()
            var email = this.$store.state.registerEmailModel.trim()

            if(username && password && name && email){
                if(username.includes(" ")){
                    this.$store.state.registerErrors = "Please enter a valid username"
                    return
                }
                http.post('/register',{
                    username,
                    password,
                    name,
                    email
                })
                    .then(result => {
                        console.log(result.data)
                        if(result.data){
                            this.$store.state.currentUser = result.data
                            localStorage.setItem('userId',result.data.username)
                            this.$store.state.userId = result.data.username
                            this.$router.push({path:"/home"})
                            this.$store.state.registerUsernameModel = ""
                            this.$store.state.registerPasswordModel = ""
                            this.$store.state.registerNameModel = ""
                            this.$store.state.registerEmailModel = ""
                            this.$store.state.registerErrors = ""
                            this.$store.state.registerPage = false
                        }
                        else{
                            this.$store.state.registerErrors = "This username is taken"
                        }
                    })
            }
            else{
                this.$store.state.registerErrors = "Please fill the all gaps"
            }

        },
        // getUserForMiniProfile(username){
        //     http.post('/getuserwithoutdetail',{
        //         username
        //     })
        //         .then(result => {
        //             console.log(result.data)
        //             this.$store.state.currentUser = result.data
        //         })
        // },
        updateUser(){
            this.$store.state.isLoading = true
            this.$store.state.editProfilePopup = false
            http.post('/updateuser',{
                newInfos:this.$store.state.newInfos,
                userId:this.$store.state.currentUser._id
            })
                .then(async (result) => {
                    console.log(result)
                    await this.getCurrentUser()
                    this.$store.state.isLoading = true
                    this.$router.go(0)
                    // this._vm.$forceUpdate();
                })
        },
        addNewTweet(){
            if(!this.$store.state.newTweet.text && !this.$store.state.newTweet.image){
                return
            }
            this.$store.state.isLoading = true
          http.post('/newtweet',{
              username:localStorage.getItem('userId'),
              tweetContent:{
                  text:this.$store.state.newTweet.text,
                  tweetImage:this.$store.state.newTweet.image,
                  author:this.$store.state.currentUser._id
              },
          })
              .then(result => {
                  console.log(result.data)
                  this.$store.state.tweets.unshift(result.data)
                  this.$store.state.newTweet.text = ""
                  this.$store.state.newTweet.image = ""
                  this.$store.state.isLoading = false
              })
        },
        addReply(){
            if(!this.$store.state.newTweet.text && !this.$store.state.newTweet.image){
                return
            }
            this.$store.state.isLoading = true
            http.post('/addreply',{
              username:localStorage.getItem('userId'),
              tweetContent:{
                  text:this.$store.state.newTweet.text,
                  tweetImage:this.$store.state.newTweet.image,
                  author:this.$store.state.currentUser._id,
                  isReply:true,
                  parent:this.$store.state.repliedTweet._id
              },
          })
              .then(result => {
                  console.log(result.data)
                  this.$router.go(0)
                  this.$store.state.newTweet.text = ""
                  this.$store.state.newTweet.image = ""
                  this.$store.state.isLoading = false
              })
        },
        getTweetPage(){
            this.$store.state.isLoading = true
            http.post('/gettweetpage',{
                page:1,
                tweetPerPage:3,
            })
                .then(async (result) => {
                    this.$store.state.tweets = await result.data
                    console.log(result.data)
                    this.$store.state.isLoading = false
                })
        },
        addOrRemoveFromBookmarks(tweetId,add){
            this.$store.state.isLoading = true
            http.post('/addorremovefrombookmarks',{
              username:localStorage.getItem('userId'),
              tweetId,
              add
          })
              .then(result => {
                  console.log(result.data)
                  if(add){
                      this.$store.state.currentUser.bookmarks.unshift(tweetId)
                  }
                  else{
                      this.$store.state.currentUser.bookmarks.splice(this.$store.state.currentUser.bookmarks.indexOf(tweetId),1)
                      this.$router.go(0)
                      // this.$store.state.bookmarks.splice(this.$store.state.currentUser.bookmarks.indexOf(tweetId),1)
                  }
                  this.$store.state.isLoading = false
              })
        },
        likeOrUnlike(tweetId,like){
            http.post("/likeorunlike",{
                currentUserId: this.$store.state.currentUser._id,
                tweetId,
                like
            })
                .then(result => {
                    console.log(result.data)
                })
            if(like){
                this.$store.state.currentUser.likedTweets.push(tweetId)
            }
            else {
                this.$store.state.currentUser.likedTweets.splice(this.$store.state.currentUser.likedTweets.indexOf(tweetId),1)
            }
        },
        removeTweet(tweetId){
            this.$store.state.isLoading = true
            http.post('/removetweet',{
              tweetId
            })
                .then(result => {
                  console.log(result.data)
                    this.$router.go(0)
                })
        },
        getCurrentUser(){
            this.$store.state.isLoading = true
            http.post('/getuserwithoutdetail',{
                        username:localStorage.getItem('userId')
                    })
                        .then(async (result) => {
                            console.log("current user",result.data)
                            this.$store.state.currentUser = await result.data
                            this.$store.state.newInfos.name = this.$store.state.currentUser.name || ""
                            this.$store.state.newInfos.mail = this.$store.state.currentUser.mail || ""
                            this.$store.state.newInfos.bio = this.$store.state.currentUser.bio || ""
                            this.$store.state.newInfos.location = this.$store.state.currentUser.location || ""
                            this.$store.state.newInfos.website = this.$store.state.currentUser.website || ""
                            this.$store.state.newInfos.bannerImage = this.$store.state.currentUser.bannerImage || "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                            this.$store.state.newInfos.profileImage = this.$store.state.currentUser.profileImage || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                            this.$store.state.isLoading = false
                        })
        },
        followOrUnfollow(follow){
            http.post('/followorunfollow',{
                currentUserId: this.$store.state.currentUser._id,
                userIdToFollow: this.$store.state.userForProfile._id,
                follow
            })
                .then(result => {
                    console.log("follow or unfollow result: " + result.data)
                })
            if(follow){
                this.$store.state.currentUser.following.push(this.$store.state.userForProfile._id)
                this.$store.state.userForProfile.followers.push(this.$store.state.currentUser._id)
            }
            else{
                this.$store.state.currentUser.following.splice(this.$store.state.currentUser.following.indexOf(this.$store.state.userForProfile._id),1)
                this.$store.state.userForProfile.followers.splice(this.$store.state.userForProfile.followers.indexOf(this.$store.state.currentUser._id),1)
            }
        },
        toggleEditProfilePopup(){
            this.$store.state.editProfilePopup = !this.$store.state.editProfilePopup
            this.$store.state.newInfos.name = this.$store.state.currentUser.name || ""
            this.$store.state.newInfos.mail = this.$store.state.currentUser.mail || ""
            this.$store.state.newInfos.bio = this.$store.state.currentUser.bio || ""
            this.$store.state.newInfos.location = this.$store.state.currentUser.location || ""
            this.$store.state.newInfos.website = this.$store.state.currentUser.website || ""
            this.$store.state.newInfos.bannerImage = this.$store.state.currentUser.bannerImage || "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
            this.$store.state.newInfos.profileImage = this.$store.state.currentUser.profileImage || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
        },
        sampleAction(obj){
            console.log("a action from mixin")
            console.log(`parameter in mixin: ${obj}`)
        },
        closeAddTweetPopup(){
            this.$store.state.addTweetPopup = false
            this.$store.state.repliedTweet = {}
        },
        openAddTweetPopup(){
            this.$store.state.addTweetPopup = true
        },
        routeToPath(p){
            this.$router.push({path:p})
        },
        restartTweets(){
            this.$store.state.tweets.forEach(tweet => {
                tweet.isDetailed = false
            })
        },
        goToBack(){
            this.$router.go(-1)
        }
    }
}