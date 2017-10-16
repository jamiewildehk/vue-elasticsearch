import 'bulma'
import 'font-awesome/css/font-awesome.css'

import VueElasticSearchBox from './components/VueElasticSearchBox.vue'

// Install the components
export function install (Vue) {
  Vue.component('vueElasticSearchBox', VueElasticSearchBox)
  /* -- Add more components here -- */
}

// Expose the components
export {
  VueElasticSearchBox
  /* -- Add more components here -- */
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
