import axios from 'axios'
// import router from "@/router";

const http = axios.create({
    baseURL:"http://localhost:3000/api",
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
            this.$store.state.editProfilePopup = false
            http.post('/updateuser',{
                newInfos:this.$store.state.newInfos,
                userId:this.$store.state.currentUser._id
            })
                .then(async (result) => {
                    console.log(result)
                    await this.getCurrentUser()
                    this.$router.go(0)
                    // this._vm.$forceUpdate();
                })
        },
        addNewTweet(){
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
                  this.$store.state.tweets.push(result.data)
              })
        },
        getCurrentUser(){
            http.post('/getcurrentuser',{
                        username:localStorage.getItem('userId')
                    })
                        .then(async (result) => {
                            console.log(result.data)
                            this.$store.state.currentUser = await result.data
                            this.$store.state.newInfos.name = this.$store.state.currentUser.name || ""
                            this.$store.state.newInfos.mail = this.$store.state.currentUser.mail || ""
                            this.$store.state.newInfos.bio = this.$store.state.currentUser.bio || ""
                            this.$store.state.newInfos.location = this.$store.state.currentUser.location || ""
                            this.$store.state.newInfos.website = this.$store.state.currentUser.website || ""
                            this.$store.state.newInfos.bannerImage = this.$store.state.currentUser.bannerImage || "https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
                            this.$store.state.newInfos.profileImage = this.$store.state.currentUser.profileImage || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                        })
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
        toggleAddTweetPopup(){
            this.$store.state.addTweetPopup = !this.$store.state.addTweetPopup
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