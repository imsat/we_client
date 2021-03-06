/**
 * Module to handle User Authentication
 * This will be imported in the store/index.js file
 */
import Cookies from 'js-cookie'
import HTTP from '../__helpers/http'
import router from '../router'

export default {
    namespaced: true,
    strict: process.env.NODE_ENV !== 'production',
    state: {
        loginInfo: {
            email: 'admin@mail.com',
            password: '123456'
        },
        token: '',
        user: [],
    },
    getters: {
        validToLogin(state) {
            if (state.loginInfo.email && state.loginInfo.password) return true
            return false
        },
    },
    mutations: {
        /** Login Email */
        SET_LOGIN_EMAIL(state, event) {
            state.loginInfo.email = event
        },
        /** Login Password */
        SET_LOGIN_PASSWORD(state, event) {
            state.loginInfo.password = event
        },
        /** User Token Set */
        SET_TOKEN(state, token) {
            state.token = token
            Cookies.set('_we_d_e_v', token, {
                expires: 7
                // httpOnly: true
            })
        },
        /** Remove token */
        REMOVE_TOKEN(state) {
            state.token = null
        },

        /** Set User */
        SET_USER(state, user) {
            state.user = user;
            Cookies.set('_we_d_e_v_u', user, {
                expires: 7
                // httpOnly: true
            })
        },
        /** Remove user */
        REMOVE_USER(state) {
            state.user = null
        },
    },
    actions: {
        /**
         * Login for User
         *
         * @param commit
         * @param state
         * @returns {Promise<Route>}
         */
        async login({ commit, state }) {
            try {
                return await HTTP()
                    .post('/auth/login', state.loginInfo)
                    .then(response => {

                        commit('SET_TOKEN', response.data.token)
                        commit('SET_USER', response.data.user)
                        return router.push('/products')

                    })
                    .catch(error => {
                        console.log(error)
                    })
            } catch (loginError) {
                console.log(loginError)
            }
        },

        /**
         * Logout for User
         *
         * @param commit
         */
        logout({commit}) {
            try {
                commit('REMOVE_TOKEN')
                commit('REMOVE_USER')
                router.push('/')
            } catch (logoutError) {
                console.log(logoutError)
            }
        },
    }
}
