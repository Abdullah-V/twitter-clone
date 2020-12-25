import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from "axios";
import store from "@/store/index"
import Hello from "@/views/Hello";
import Login from "@/views/Login";
import Home from "@/views/Home";
import Profile from "@/views/Profile";
import TweetDetails from "@/views/TweetDetails";

Vue.use(VueRouter)

const isLogin = (n) => {
    if(localStorage.getItem('userId')){
        n()
    }
    else{
        n('/')
    }
}

const routes = [
    {
    path:"/",
    component:Hello,
    meta:{
      title:"Twitter clone - Welcome"
    },
    beforeEnter: (to, from, next) => {
        if(store.state.userId){
            next('/home')
        }
        else{
            next()
        }
    }
    },
    {
      path: "/login",
      component:Login,
        meta:{
            title:"Twitter clone - Login"
        },
        beforeEnter: (to, from, next) => {
            if(store.state.userId){
                next('/home')
            }
            else{
                next()
            }
        }
    },
    {
        path: "/home",
        component:Home,
        meta:{
            title:"Twitter clone - Home"
        },
        beforeEnter: (to, from, next) => {
            isLogin(next)
        }
    },
    {
        path:"/:username",
        component: Profile,
        meta:{
          title:"User"
        },
        beforeEnter: async (to, from, next) => {
            if(localStorage.getItem('userId')){
                if((to.params.username === store.state.userForProfile.username)){
                    next()
                }
                else{
                    axios.post('http://localhost:3000/api/getuserwithdetails',{
                        username:to.params.username,
                    })
                        .then(async (result) => {
                            console.log(`here is user: ${result.data}`)
                            if(!result.data){
                                next("/")
                            }
                            store.state.userForProfile = await result.data
                            next()
                        })
                }
            }
            else{
                next('/')
            }
        }
    },
    {
        path:"/:username/tweets/:tweetId",
        component: TweetDetails,
        meta:{
            title:"Twitter clone - Tweet"
        },
        beforeEnter: (to, from, next) => {
            if(localStorage.getItem('userId')){
                // if(to.params.tweetId === store.state.tweetForDetail._id){
                //     next()
                //     return
                // }
                axios.post('http://localhost:3000/api/getthetweet',{
                    tweetId:to.params.tweetId
                })
                    .then(result => {
                        console.log(result.data)
                        store.state.tweetForDetail = result.data
                        store.state.tweetForDetail.isDetailed = true
                        next()
                    })
            }
            else{
                next('/')
            }
        }
    },
    {
        path:"*",
        redirect:"/"
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeResolve((to,from,next) => {
    if(to.meta.title === "User"){
        document.title = "Twitter clone - " + store.state.userForProfile.name
    }
    else{
        document.title = to.meta.title || "Twitter clone"
        console.log(from)
    }
    next()
})

export default router
