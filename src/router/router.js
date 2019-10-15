import VueRouter from 'vue-router'
import query from '../main/query.vue'
import home from '../main/home.vue'
import query_formula from '../main/queryFormula.vue'

var router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: home },
    { path: '/query', name: 'query', component: query },
    { path: '/query_formula', name: 'query_formula', component: query_formula },
    { path: '*', redirect: '/home' },
  ]
})

export default router