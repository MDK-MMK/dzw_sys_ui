import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/Login.vue'
import register from '../views/Register.vue'
import home from '../views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    //登录
    {path: '/',name: 'login',component: login},
    //主页面
    {path: '/home',name: 'home',component: home},
    //注册
    {path: '/register',name: 'register',component: register},
  ]
})
