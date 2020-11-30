import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from "@/views/Hello";
import Login from "@/views/Login";
import Home from "@/views/Home";

Vue.use(VueRouter)

const routes = [
    {
    path:"/hello",
    component:Hello
    },
    {
      path: "/login",
      component:Login
    },
    {
        path: "/home",
        component:Home,
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
