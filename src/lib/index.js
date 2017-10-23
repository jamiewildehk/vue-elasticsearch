// import 'font-awesome/css/font-awesome.css'

import { SuggestManager, SearchManager } from './api'
import VueElasticStore from './store'
import VueElasticAutocomplete from './components/VueElasticAutocomplete.vue'

// Install the components
export function install (Vue, { suggest, search }) {
  SuggestManager.configure(suggest)
  SearchManager.configure(search)

  Vue.component('vueElasticAutocomplete', VueElasticAutocomplete)
}

// Expose the store and components
export {
  VueElasticStore,
  VueElasticAutocomplete
}

/* -- Plugin definition & Auto-install -- */
/* You shouldn't have to modify the code below */

// Plugin
const plugin = {
  install
}

export default plugin

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}
