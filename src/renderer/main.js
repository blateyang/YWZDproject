import Vue from 'vue'

import axios from 'axios'
import './assets/iconfont/iconfont.css'
import '../common/common.css'

import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import WebSql from '../../WebSql/WebSql'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
Vue.use(WebSql);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.prototype.$bus=new Vue();
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
