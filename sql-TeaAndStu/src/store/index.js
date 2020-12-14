import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    teacherId: ''
  },
  mutations: {
    setTeacherId (state, id) {
      state.teacherId = id
    }
  },
  actions: {
  },
  modules: {
  }
})
