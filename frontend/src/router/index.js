import Vue from 'vue'
import VueRouter from 'vue-router'
import Hello from "@/views/Hello";

Vue.use(VueRouter)

const routes = [
  {
   path:"/hello",
   component:Hello
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
