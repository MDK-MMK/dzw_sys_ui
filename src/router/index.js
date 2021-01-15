import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/Login.vue'
import register from '../views/Register.vue'
import home from '../views/Home.vue'
import workcar from '../views/yyt/Workcar.vue'
import stars from '../views/yyt/Stars'
import zhiwei from '../views/ljh/ZhiWei.vue'
import employee from '../views/ljh/Employee.vue'
import team from '../views/yyt/Team.vue'

import fdjbrand from '../views/tzy/fdjbrand.vue'
import gyssupplier from '../views/tzy/gyssupplier.vue'
import weixiuitems from '../views/tzy/weixiuitems.vue'
import Maintainzw from '../views/yyt/Maintainzw.vue'



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
        //技工班组
      {path: '/team',name: 'team',component: team},

       //发动机品牌
      {path: '/fdjbrand',name: 'fdjbrand',component: fdjbrand},
       //供应商管理
      {path: '/gyssupplier',name: 'gyssupplier',component: gyssupplier},
       //维修项目管理
       {path: '/weixiuitems',name: 'weixiuitems',component: weixiuitems},
    //注册
    {path: '/register',name: 'register',component: register},
      //外勤车辆
      {path: '/workcar',name: 'workcar',component: workcar},
       //站外接车
       {path: '/Maintainzw',name: 'Maintainzw',component: Maintainzw},
    ]},
    //注册
    {path: '/register',name: 'register',component: register},

  ]
})
