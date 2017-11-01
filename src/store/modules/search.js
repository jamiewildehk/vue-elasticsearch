import * as types from '../mutation-types'
import { SearchManager } from '../../api'

// initial state
const state = {
  keyword: '',
  fetching: false,
  total: 0,
  hits: [],
  query: {},
  error: null,
}

// getters
const getters = {
  keyword: state => state.keyword,
  fetching: state => state.fetching,
  total: state => state.total,
  hits: state => state.hits,
  query: state => state.query,
  error: state => state.error,
}

// mutations
const mutations = {
  [types.UPDATE_KEYWORD] (state, { keyword }) {
    state.keyword = keyword
  },

  [types.SEARCH_REQUEST] (state) {
    state.fetching = true
  },

  [types.SEARCH_SUCCESS] (state, { query, response }) {
    state.fetching = false
    state.query = query
    state.total = response.total
    state.hits = response.hits
  },

  [types.SEARCH_FAILURE] (state, { error }) {
    state.fetching = false
    state.error = error
  },
}

// actions
const actions = {
  fetchHits ({ commit, state }, { keyword, options }) {
    commit(types.UPDATE_KEYWORD, { keyword })
    commit(types.SEARCH_REQUEST)

    SearchManager.search(keyword, options)
      .then(({ query, response }) => {
        commit(types.SEARCH_SUCCESS, { query, response })
      })
      .catch(error => {
        commit(types.SEARCH_FAILURE, { error })
      })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
