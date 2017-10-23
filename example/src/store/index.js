import Vue from 'vue'
import Vuex from 'vuex'
import { VueElasticStore } from '../../../dist/vue-elasticsearch.common'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    elastic: VueElasticStore
  }
})
