// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueResource from 'vue-resource'
// import store from './store'
Vue.use(VueResource)




Vue.prototype.$axios = axios;

// let AUTH_TOKEN = (function() {
//     return localStorage.getItem("token");
// })();

// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

// axios.interceptors.request.use(function(config) {
//     let url = config.url;
//     if (url.indexOf("login") > -1) {
//         localStorage.setItem('token', "");
//         config.headers.Authorization = "";
//     }
//     if (url.indexOf("user") > -1 && url.indexOf("login") < 0) {
//         config.headers.Authorization = localStorage.getItem("token");
//     }
//     return config;
// }, function(error) {
//     return Promise.reject(error);
// });

/* 请求拦截 */
// axios.interceptors.request.use(
//     config => {
//         if (store.state.token) {
//             config.headers.common['Authentication-Token'] = store.state.token;
//         }
//         return config;
//     },
//     err => Promise.reject(err)
// );
// axios.interceptors.response.use(
//     responce => {
//         return responce;
//     },
//     error => {
//         if (error.responce) {
//             switch (error.responce.status) {
//                 case 401:
//                     this.$store.commit('del_token');
//                     router.replace({
//                         path: '/login',
//                         query: { redirect: router.currentRoute.fullPath }
//                     })
//             }
//         }
//         return Promise.reject(error.responce.data);
//     });

axios.defaults.baseURL = 'http://118.178.191.224:8081';
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.headers.common['Authentication-Token'] = store.state.token;








// Vue.prototype.$axios = axios
// Vue.config.productionTip = false

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */ )




/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})