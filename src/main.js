// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
Vue.prototype.$version = '20.0515.1119' 
Vue.prototype.$versionBrief = '修复了已知BUG, 优化了用户体验.'

Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
