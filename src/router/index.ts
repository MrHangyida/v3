import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import CreatePost from '../views/CreatePost.vue'
import store from '../store'
import request from '../untils/request'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    components: {
      default: Home,
      // footer: import(/* webpackChunkName: "about" */ '../components/GlobalFoot.vue')
    },
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta: {
      requireAlreadyLogin: true,
    },
  },
  {
    path: '/signup',
    name: 'signup',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Signup.vue'),
    meta: {
      requireAlreadyLogin: true,
    },
  },
  {
    path: '/create',
    name: 'create',
    component: CreatePost,
    meta: {
      requireLogin: true,
    },
  },
  {
    path: '/column/:id',
    name: 'column',
    component: () =>
      import(/* webpackChunkName: "about" */ '../components/ColumnDetail.vue'),
    meta: {
      requireLogin: true,
    },
  },
  {
    path: '/posts/:id',
    name: 'post',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/PostDetail.vue'),
    meta: {
      requireLogin: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})
router.beforeEach((to, from, next) => {
  const { user, token } = store.state
  const { requireLogin, requireAlreadyLogin } = to.meta
  if (!user.isLogin) {
    if (token) {
      request.defaults.headers.common.Authorization = `Bearer ${token}`
      store.dispatch('fetchCurrentUser').then(() => {
        if (requireAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(e => {
        console.error(e)
        store.commit('loginOut',false)
        next('login')
      })
    } else {
      console.log(233, requireLogin)
      if (requireLogin) {
        next('login')
      } else {
        next()
      }
    }
  } else {
    if (requireAlreadyLogin) {
      next('/')
    } else {
      next()
    }
  }
})
export default router
