
const routes = [
  {
    path: '/login', component: () => import('pages/login.vue')
  },
  {
    path: '/', component: () => import('pages/login.vue')
  },
  {
    path: '/cohort',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'create', component: () => import('pages/createCohort.vue') },
      { path: 'summary/:cohort_id', component: () => import('pages/summary.vue') },
      { path: ':method/:cohort_id', component: () => import('pages/createCohort.vue') },

      { path: 'view/:cohort_id', component: () => import('pages/viewCohort.vue') },
      { path: 'summerygraph', component: () => import('pages/summeryGraph.vue') },
      { path: 'list', component: () => import('pages/listCohort.vue') }
    ]
  },
  {
    path: '/codeset',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: 'list', component: () => import('pages/listCodeset.vue') },
      { path: 'create', component: () => import('pages/codeSet.vue') },
      { path: ':method/:codeset_id', component: () => import('pages/codeSet.vue') }
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
