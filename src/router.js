import Vue from 'vue'
import Router from 'vue-router'
import Home from '../src/views/Home.vue'
import CreateOrder from '../src/views/CreateOrder.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/addOrder',
      component: CreateOrder
    },
    {
      path: '/pickUp',
      component: CreateOrder
    }
  ]
})
