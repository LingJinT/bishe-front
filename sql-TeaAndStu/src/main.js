import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/element.js'
import echarts from 'echarts'

const service = axios.create({
  baseURL: '/api'
})
service.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (config.url === '/teacher/login' || config.url === '/student/login') {
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
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  echarts,
  render: h => h(App)
}).$mount('#app')
