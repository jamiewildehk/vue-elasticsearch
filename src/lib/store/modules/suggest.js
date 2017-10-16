import * as types from '../mutation-types'

// initial state
const state = {
  query: 'ok',
  fetching: false,
  total: 0,
  keywords: [],
  error: null
}

// getters
const getters = {
  query: state => state.query,
  fetching: state => state.fetching,
  total: state => state.total,
  keywords: state => state.keywords,
  error: state => state.error
}

// mutations
const mutations = {
  [types.UPDATE_QUERY] (state, { query }) {
    state.query = query
  },

  [types.SUGGEST_REQUEST] (state) {
    state.fetching = true
  },

  [types.SUGGEST_SUCCESS] (state, { response }) {
    // TODO: Parse response
    state.fetching = false
  },

  [types.SUGGEST_FAILURE] (state, { error }) {
    state.fetching = false
    state.error = error
  }
}

// actions
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
