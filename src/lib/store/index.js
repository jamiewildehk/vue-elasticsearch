import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import search from './modules/search'
import suggest from './modules/suggest'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    suggest,
    search
  }
})
