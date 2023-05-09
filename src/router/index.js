import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Dashboard.vue'
import Employe from '../pages/Employe.vue'
import Presence from '../pages/Presence.vue'
import Conge from '../pages/Conge.vue'
import Quotation from '../pages/Quotation.vue'
import Agence from '../pages/Agence.vue'
import Service from '../pages/Service.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: '', component: Home },
  { path: '/employes', name: 'employes', component: Employe },
  { path: '/presence', name: 'presence', component: Presence },
  { path: '/conge', name: 'conge', component: Conge },
  { path: '/quotation', name: 'quotation', component: Quotation },
  { path: '/service', name: 'service', component: Service },
  { path: '/agence', name: 'agence', component: Agence },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
