import * as types from '../mutation-types'

// initial state
const state = {
  keyword: '',
  fetching: false,
  total: 0,
  hits: [],
  error: null
}

// getters
const getters = {
  keyword: state => state.keyword,
  fetching: state => state.fetching,
  total: state => state.total,
  hits: state => state.hits,
  error: state => state.error
}

// mutations
const mutations = {
  [types.UPDATE_KEYWORD] (state, { keyword }) {
    state.keyword = keyword
  },

  [types.SEARCH_REQUEST] (state) {
    state.fetching = true
  },

  [types.SEARCH_SUCCESS] (state, { response }) {
    // TODO: Parse response
    state.fetching = false
  },

  [types.SEARCH_FAILURE] (state, { error }) {
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
