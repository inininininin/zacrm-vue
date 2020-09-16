// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
Vue.prototype.$version = '1.0.20091605'
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

axios.interceptors.request.use(
  config => {
    config.cancelToken = new axios.CancelToken(function (cancel) {
      store.commit('pushToken', {cancelToken: cancel})
    })
    return config
  }
)

Vue.config.productionTip = false
Vue.prototype.moment = moment;
Vue.prototype.$store = store
Vue.prototype.$axios = axios
// Vue.prototype.$laydate = laydate

Vue.use(ElementUI);
Vue.prototype.$echarts = require('echarts')
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
