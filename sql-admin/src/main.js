import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import axios from 'axios'
// axios.defaults.baseURL = ''
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// Vue.prototype.$http = axios
const service = axios.create({
  baseURL: '/api'
})
service.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (config.url === '/admin/login') {
    console.log('走了这里')
    return config
  }
  if (token) {
    config.headers.Authentication = `Bearer ${token}`
    return config
  }
  return false
})
Vue.prototype.$axios = service
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
