import 'bulma'
import 'font-awesome/css/font-awesome.css'

import VueElasticStore from './store'
import VueElasticSearchBox from './components/VueElasticSearchBox.vue'

// Install the components
export function install (Vue, options) {
  Vue.component('vueElasticSearchBox', VueElasticSearchBox)
}

// Expose the store and components
export {
  VueElasticStore,
  VueElasticSearchBox
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
