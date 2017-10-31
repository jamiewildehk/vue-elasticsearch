import Vue from 'vue'
import Router from 'vue-router'

import Example from '@/components/Example'
import Result from '@/components/Result'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Example',
      component: Example
    },
    {
      path: '/result/:keyword',
      name: 'Result',
      component: Result
    }
  ]
})
