import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'

/** __helpers/__rules */
import __helpers from './__helpers/__helpers'
// import __rules from './__helpers/__rules'

/** Authentication */
import authentication from './authentication'
/** Product */
import product from './product'

Vue.use(Vuex)


export default new Vuex.Store({
    strict: true,
    state: {
        baseUrl: '/api',
        isLoading: false,
    },
    modules: {
        __helpers,
        // __rules,
        authentication,
        product
    },
    getters: {},
    mutations: {},
    actions: {},
    plugins: [
        createPersistedState({
            key: '_we_d_e_v',
            paths: ['authentication.token'],
            storage: {
                getItem: key => Cookies.get(key),
                setItem: (key, value) => Cookies.set(key, value, { expires: 3 }),
                removeItem: key => Cookies.remove(key)
            }
        }),
        createPersistedState({
            key: '_we_d_e_v_u',
            paths: ['authentication.user'],
            storage: {
                getItem: key => Cookies.get(key),
                setItem: (key, value) => Cookies.set(key, value, { expires: 3 }),
                removeItem: key => Cookies.remove(key)
            }
        }),
    ]
})
