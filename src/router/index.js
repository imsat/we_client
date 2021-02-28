import Vue from 'vue'
import Router from 'vue-router'

/** Login Section */
import Login from '@/views/auth/Login'

/** Live Chat Section */
import Product from '@/views/product/Product'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            alias: '/login',
            component: Login,
            name: 'login'
        },
        /** Product */
        {
            path: '/products',
            component: Product,
            name: 'products',
            meta: {
                description: 'Products module',
                requiresAuth: true,

            }
        }
    ]
})
