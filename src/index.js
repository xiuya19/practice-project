import Vue from 'vue'
import App from './app.vue'
import router from './router'
import Axios from 'axios'
import Qs from 'qs'
import './assets/style/global.css'
import Head from './compoment/head.vue'

Axios.defaults.baseURL = 'http://127.0.0.1:8888/'
Vue.prototype.$axios = Axios
Vue.prototype.$Qs = Qs
Vue.prototype.$deepCloneJson = (obj) => JSON.parse(JSON.stringify(obj))

const root = document.createElement('div')
document.body.appendChild(root)

Vue.component(Head.name, Head)

let VUE = new Vue({
  router: router,
  render: h => h(App)
}).$mount(root)
