import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  // 将小模块注册为模块
  modules: {
    user
  },
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  }

})
