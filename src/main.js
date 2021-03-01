import Vue from 'vue'
import 'babel-polyfill'
import {sync} from 'vuex-router-sync'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'

Vue.config.productionTip = false


/** Full Page Loader */
import FullPageLoader from '@/components/__partials/FullPageLoader'


/** Full Page Loader */
Vue.component('fpl', FullPageLoader)


sync(store, router)

/** Navigation Guard */
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.state.authentication.token) {
            next({
                path: '/',
                query: {redirect: to.fullPath}
            })
        } else {
            next()
        }

    } else {
        next() // make sure to always call next()!
    }
})


/** End of Navigation guard */
// router.afterEach((to, from) => {
//   //
// })


new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount('#app')




