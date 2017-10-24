// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'font-awesome/css/font-awesome.css'
import VueElastic from 'vue-elasticsearch'
import 'vue-elasticsearch/dist/vue-elasticsearch.css'

import store from './store'
import App from './App'
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
  store,
  router,
  template: '<App/>',
  components: { App }
})
