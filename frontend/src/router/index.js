import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: {
        auth: true,
        pageTitle: 'Home',
        resource: 'ACL',
        action: 'read',
        breadcrumb: [
          {
            text: 'Home',
            active: true,
          },
        ],
      },
    },
    {
      path: '/second-page',
      name: 'second-page',
      component: () => import('@/views/SecondPage.vue'),
      meta: {
        auth: true,
        pageTitle: 'Second Page',
        breadcrumb: [
          {
            text: 'Second Page',
            active: true,
          },
        ],
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta: {
        layout: 'full'
      }
    },
    {
      path: '/marcas',
      name: 'marcas',
      component: () => import('@/views/marca/Index.vue'),
      meta: {
        auth: true,
        pageTitle: 'Listado de Marcas',
      }
    },
    {
      path: '/error-404',
      name: 'error-404',
      component: () => import('@/views/error/Error404.vue'),
      meta: {
        layout: 'full',
      },
    },
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

// router.beforeEach((to, from, next)=>{
//   const isAuthenticated = store.getters.isAuthenticated

//   if(to.matched.some(record => record.meta.requiresAuth)) {
//     if (!isAuthenticated) {
//       next({
//           path: '/login',
//       })
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

  router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('user')
    if (to.matched.some(record => record.meta.auth) && !loggedIn) {
      next('/login')
      return
    }
    next()
  })

export default router
