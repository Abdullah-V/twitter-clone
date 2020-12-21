import Vue from 'vue'
import VueRouter from 'vue-router'
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
        beforeEnter: (to, from, next) => {
            isLogin(next)
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
