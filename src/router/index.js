import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserView from '@/views/UserView.vue'
import BoardgamesView from '@/views/BoardgamesView.vue'
import BoardgameIdView from '@/views/BoardgameIdView.vue'
import BoardgameAdd from '@/views/BoardgameAdd.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  },
  {
    path: '/boardgames',
    name: 'boardgames',
    component: BoardgamesView
  },
  {
    path:'/boardgames/:id', 
    name:'singleboardgame',
    component: BoardgameIdView,
    props: true
  },
  {
    path:'/boardgames/add',
    name:'addboardgame',
    component: BoardgameAdd,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
