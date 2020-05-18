// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import './assets/all.css'
import '../static/js/rem.js'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import '../node_modules/layui-src/dist/css/layui.css'
// import '../node_modules/layui-src/src/layui'
// import '../static/layui/css/layui.css'
// import '../static/layui/layui'
// Vue.use(ElementUI);
// layui.use('layer', function() {
//   layer = layui.layer;
// });

Vue.config.productionTip = false
// console.dir(window.layui)
// Vue.prototype.$layui = window.layui
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
