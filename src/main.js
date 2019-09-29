
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueI18n from 'vue-i18n'
import app from './App.vue'
import router from './router/router.js'
import i18n from './tools/i18n.js'
import axios from 'axios'
import http from './tools/http.js'

// import 'bootstrap'
import 'bootstrap/dist/js/bootstrap.js'
/******************************/
import 'bootstrap/dist/css/bootstrap.css'

Vue.use(VueRouter)
Vue.use(VueI18n)

// router.beforeEach((to, from, next) => {
//   if (to.path === '/query' || to.path == "/query_formlua") {
//     next({ path: '/home' })
//   }
//   next()
// });

Vue.prototype.$http = axios
Vue.prototype.$ajax = http
Vue.prototype.$dic = {}
Vue.prototype.$query_obj = {
  cat: '',
  id: 0,
  from: 0,
  to: 0
}
Vue.prototype.$query_formula_obj = {}

var vm = new Vue({
  el: '#app',
  i18n,
  router,
  render: c => c(app),
})

