// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import '../static/js/rem.js'
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import store from './store'
import moment from 'moment'
Vue.prototype.$version = '20.0515.1159'
Vue.prototype.$versionBrief = '修复了已知BUG, 优化了用户体验.'
Vue.config.productionTip = false
Vue.prototype.moment = moment;
Vue.prototype.$store = store
Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
