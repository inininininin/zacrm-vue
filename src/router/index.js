import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// const _import = require('./_import_' + process.env.NODE_ENV + '.js')
// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
// const _import = require("./import-" + process.env.NODE_ENV);
// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  // {
  //   path: "/404",
  //   component: _import("common/404"),
  //   name: "404",
  //   meta: {
  //     title: "404未找到"
  //   }
  // }, 
  // {  
  //   path: "/login",
  //   component: _import("common/login"),
  //   name: "login",
  //   meta: {
  //     title: "登录"
  //   }
  // }
]

const mainRoutes = [
  {
    path: '/',
    name: 'login',
    component: ()=>import( '@/components/login')
  },
  {
    path: '/index',
    name: 'indexs',
    component: ()=>import( '@/components/index')
  }
]

export default new Router({
  routes: globalRoutes.concat(mainRoutes)
})