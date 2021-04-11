import Vue from 'vue'
import App from './App.vue'
import router from './router'
//导入全局element ui样式
import './plugins/element.js'
//导入全局样式表
import './assets/css/global.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.$axios=axios
axios.defaults.baseURL='http://localhost:3000/'
axios.interceptors.request.use(config=>{
  config.headers.Authorization=window.sessionStorage.getItem('token');
  return config
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
