import Vue from 'vue'
import App from './app.vue'
import router from './router/router.js'
import Axios from 'axios'
import './assets/style/global.css'
import Head from './compoment/head.vue'
import Bus from './bus/bus.js'

Axios.defaults.baseURL = 'http://127.0.0.1:8888/';
Vue.prototype.$axios = Axios;
Vue.use(Bus);

const root = document.createElement('div');
document.body.appendChild(root);

Vue.component(Head.name, Head);

let VUE = new Vue({
    router:router,
    render: (h) => h(App)
}).$mount(root)