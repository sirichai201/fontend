import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',// set path  page
  //   name: 'home', // set namepage path
  //   component: HomeView //call file import
  // },
  {
    path: '',// set path
    name: 'toobar', // set
    component: () => import('../views/toobar.vue'),
    children: [
    
      {
        path: '/',// set path  page
        name: 'home', // set namepage path
        component: HomeView //call file import
      },
    ] //
  },


 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
