import Vue from 'vue'
import Router from 'vue-router'
import Home from '../src/views/Home.vue'
import BossHome from './views/boss/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/admin',
      name: 'boss',
      component: BossHome
    },
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
