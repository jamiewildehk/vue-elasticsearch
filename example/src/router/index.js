import Vue from 'vue'
import Router from 'vue-router'

import Search from '@/components/Search'
import Result from '@/components/Result'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Search',
      component: Search
    },
    {
      path: '/result/:keyword',
      name: 'Result',
      component: Result
    }
  ]
})
