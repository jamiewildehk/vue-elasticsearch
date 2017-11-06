import * as types from '../mutation-types'
import { SuggestManager } from '../../api'

// initial state
const state = {
  query: 'ok',
  fetching: false,
  total: 0,
  suggestions: [],
  error: null,
}

// getters
const getters = {
  query: state => state.query,
  fetching: state => state.fetching,
  total: state => state.total,
  suggestions: state => state.suggestions,
  error: state => state.error,
}

// mutations
const mutations = {
  [types.UPDATE_QUERY] (state, query) {
    state.query = query
  },

  [types.SUGGEST_REQUEST] (state) {
    state.fetching = true
  },

  [types.SUGGEST_SUCCESS] (state, suggestions) {
    state.fetching = false
    state.suggestions = suggestions
  },

  [types.SUGGEST_FAILURE] (state, error) {
    state.fetching = false
    state.error = error
  },
}

// actions
const actions = {
  fetchSuggestions ({ commit, state }, query) {
    commit(types.UPDATE_QUERY, query)
    commit(types.SUGGEST_REQUEST)

    SuggestManager.suggest(query)
      .then(suggestions => {
        commit(types.SUGGEST_SUCCESS, suggestions)
      })
      .catch(error => {
        commit(types.SUGGEST_FAILURE, error)
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
