import Vue from 'vue'
import Vuex from 'vuex'
import { VueElasticStore } from 'vue-elasticsearch'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    elastic: VueElasticStore
  }
})
