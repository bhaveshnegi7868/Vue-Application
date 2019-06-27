
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/create', component: () => import('pages/createCohort.vue') },
      { path: '/summerygraph', component: () => import('pages/summeryGraph.vue') },
      { path: '/list', component: () => import('pages/listCohort.vue') },
      { path: '/summary', component: () => import('pages/summary.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
