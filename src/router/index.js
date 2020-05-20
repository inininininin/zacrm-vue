import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// const _import = require('./_import_' + process.env.NODE_ENV + '.js')
// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require("./_import_" + process.env.NODE_ENV+ '.js');
console.log(process.env.NODE_ENV)
//登录及其全局页面
const globalRoutes = [
  {
    path: '/login',
    name: '/login',
    component: ()=>import( '@/components/login')
  },
  {
    path: '/tihuan',
    name: '/tihuan',
    component:  ()=>import( '@/components/tihuan'),
  },
]
console.dir(_import)

//页面
const mainRoutes = [
  
  {
    path: '/',
    redirect:'/index'
  },
  {
    path: '/index',
    name: '/index',
    component: ()=>import( '@/components/index')
  },
  {
    path: '/history-detail',
    name: '/history-detail',
    component: ()=>import( '@/components/history-detail')
    
  },
  {
    path: '/add-hos',
    name: '/add-hos',
    component: ()=>import( '@/components/add-hos')
    
  },
  {
    path: '/lead-index',
    name: '/lead-index',
    component: ()=>import( '@/components/lead-index')
    
  }
]

const router = new Router({
  routes: globalRoutes.concat(mainRoutes)
})

router.afterEach((to,from) =>{
  debugger
  if(to.path == from.path){
    // next({path:'/tihuan',query:to.query})
    router.replace({path:'/tihuan',query:{query:JSON.stringify(to.query),path:to.path}})
  }
})


export default router