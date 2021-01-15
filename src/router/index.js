import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/Login.vue'
import register from '../views/Register.vue'
import home from '../views/Home.vue'
import stars from '../views/yyt/Stars'
import zhiwei from '../views/ljh/ZhiWei.vue'
import employee from '../views/ljh/Employee.vue'
import team from '../views/yyt/Team.vue'
import leave from '../views/ljh/Leave.vue'
import maintain from '../views/ljh/Maintain.vue'

Vue.use(Router)

export default new Router({
  routes: [
    //登录
    {path: '/',name: 'login',component: login},
    //主页面
    {path: '/home',name: 'home',component: home,children:[
       //技工星级
      {path: '/stars',name: 'stars',component: stars},
       //岗位定义
       {path: '/zhiwei',name: 'zhiwei',component: zhiwei},
       //组织机构
      {path: '/emp',name: 'emp',component: employee},
      //组织机构
      {path: '/lea',name: 'lea',component: leave},
        //技工班组
      {path: '/team',name: 'team',component: team},
      //
      //组织机构
      {path: '/maintain',name: 'maintain',component: maintain},
    ]},
    //注册
    {path: '/register',name: 'register',component: register},
  ]
})
