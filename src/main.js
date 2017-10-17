// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import VueElastic from './lib'
import router from './router'

Vue.use(VueElastic, {
  suggest: {
    host: 'https://search-eschr-tyiqhwx3brb5tglcxbocehuvda.eu-west-1.es.amazonaws.com',
    index: 'test',
    type: 'suggestions'
  },
  search: {
    host: 'https://search-eschr-demo-kokjqkr3h4rrpfcwbrqzdrdhbu.ap-southeast-1.es.amazonaws.com',
    index: 'test',
    type: 'tags'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
