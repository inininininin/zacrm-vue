/* eslint-disable no-new */
/* eslint-disable import/first */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';  
Vue.prototype.$version = '1.4.3';
Vue.prototype.$versionBrief = '修复了已知BUG, 优化了用户体验.';
Vue.prototype.$Interface = '';
// 忠安客户漏斗管理系统
Vue.prototype.$titleName = '忠安客户漏斗管理系统';
import App from './App';
import router from './router/index.js';
import ElementUI from 'element-ui';
// import { Loading } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
import callService from './assets/call';
import common from './assets/common';
import store from './store';
import moment from 'moment';
import axios from 'axios';

axios.interceptors.request.use(
  config => {
    config.cancelToken = new axios.CancelToken(function (cancel) {
      store.commit('pushToken', {cancelToken: cancel});
    });
    return config;
  }
);

Vue.config.productionTip = false;
Vue.prototype.moment = moment;
Vue.prototype.$store = store;
Vue.prototype.$axios = axios;
Vue.prototype.$callService = callService;
Vue.prototype.$common = common;
Vue.use(ElementUI);
Vue.prototype.$echarts = require('echarts')
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
