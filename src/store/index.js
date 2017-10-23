import * as actions from './actions'
import * as getters from './getters'
import search from './modules/search'
import suggest from './modules/suggest'

export default {
  namespaced: true,
  actions,
  getters,
  modules: {
    suggest,
    search,
  },
}
