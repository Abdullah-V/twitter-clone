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
        beforeEnter: (to, from, next) => {
            isLogin(next)
        }
    },
    {
        path:"/:username",
        component: Profile,
        beforeEnter: async (to, from, next) => {
            if(localStorage.getItem('userId')){
                if((to.params.username === store.state.userForProfile.username)){
                    next()
                }
                else if(to.params.username === store.state.currentUser.username){
                    store.state.userForProfile = store.state.currentUser
                }
                else{
                    axios.post('http://localhost:3000/api/getuserwithdetails',{
                        username:to.params.username,
                    })
                        .then(async (result) => {
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
        beforeEnter: (to, from, next) => {
            isLogin(next)
        }
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
