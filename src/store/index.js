import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:null,
    clients:[],
    // url:"/api",
    // url:"https://hrm.amidev.bi/api",
    url:"http://127.0.0.1:8000/api",
    employes:[],
    conges:[],
    presences:[],
    services:[],
    agences:[],
    users:[],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
