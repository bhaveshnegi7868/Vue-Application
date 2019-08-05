import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import VueDataTables from 'vue-data-tables'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

locale.use(lang)
Vue.use(VueRouter)
Vue.use(VueDataTables)
Vue.use(ElementUI)

const options = {
  confirmButtonColor: '#6b9840',
  cancelButtonColor: '#9f9f9f'
}

Vue.use(VueSweetalert2, options)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  return Router
}
