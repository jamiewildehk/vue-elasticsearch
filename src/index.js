import { SuggestManager, SearchManager } from './api'
import VueElasticStore from './store'
import VueElasticAutocomplete from './components/VueElasticAutocomplete.vue'
import VueElasticResultBox from './components/VueElasticResultBox.vue'

// Install the components
export function install (Vue, { suggest, search }) {
  SuggestManager.configure(suggest)
  SearchManager.configure(search)

  Vue.component('vueElasticAutocomplete', VueElasticAutocomplete)
  Vue.component('vueElasticResultBox', VueElasticResultBox)
  /* -- Add more components here -- */
}

// Expose the components
export {
  VueElasticStore,
  VueElasticAutocomplete,
  VueElasticResultBox,
  /* -- Add more components here -- */
}

/* -- Plugin definition & Auto-install -- */
/* You shouldn't have to modify the code below */

// Plugin
const plugin = {
  /* eslint-disable no-undef */
  version: VERSION,
  install,
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
