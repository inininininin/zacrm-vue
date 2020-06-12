// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
Vue.prototype.$version = '20.0610.1743'
Vue.prototype.$versionBrief = '修复了已知BUG, 优化了用户体验.'
import App from './App'
import router from './router/index.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';

import store from './store'
import moment from 'moment'
import axios from 'axios'
import qs from 'qs'


Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.prototype.moment = moment;
Vue.prototype.$store = store
Vue.use(ElementUI);
Vue.prototype.$echarts = require('echarts')
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
