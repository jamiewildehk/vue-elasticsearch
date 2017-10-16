import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/Main'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'Hello',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'Main',
      component: Main
    }
  ]
})
