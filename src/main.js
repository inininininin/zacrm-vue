// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
<<<<<<< HEAD
// import './assets/all.css'
import '../static/js/rem.js'

import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
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
=======
Vue.prototype.$version = '20.0521.1017' 
Vue.prototype.$versionBrief = '修复了已知BUG, 优化了用户体验.'
>>>>>>> c7d90f6264b3547ea8c2879b96dfa4340fe44041

Vue.use(ElementUI);
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
