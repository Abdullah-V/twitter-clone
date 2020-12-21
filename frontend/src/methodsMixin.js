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
        getTheUser(username){
            http.post('/getuser',{
                username
            })
                .then(result => {
                    console.log(result.data)
                    this.$store.state.currentUser = result.data
                })
        },
        sampleAction(obj){
            console.log("a action from mixin")
            console.log(`parametr in mixin: ${obj}`)
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