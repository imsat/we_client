/**
 * Module to handle AXIOS Requests
 */
import axios from 'axios'
import store from '../store'
import router from '../router'

export default () => {
    const instance = axios.create({
        baseURL: store.state.baseUrl,
        // timeout: 50000,
        headers: {
            // Accept: '*/*',
            Accept: 'application/json',
            "Content-Type": 'application/json',
            Authorization: `Bearer ${store.state.authentication.token}`,
            locale: 'en'
        },
    })

    /** Global loader */
    store.commit('__helpers/SET_IS_LOADING', true, {root: true})

    /** Axios Interceptors */
    instance.interceptors.response.use(
        function (response) {
            /** Global loader */
            store.commit('__helpers/SET_IS_LOADING', true, {root: true})

            return response
        },
        function (error) {

            // const originalRequest = error.config

            if (error.response.status === 401) {
                store.commit('authentication/REMOVE_TOKEN')
                router.push('/')
            }

            /** Global loader */
            store.commit('__helpers/SET_IS_LOADING', true, {root: true})
            store.commit('__helpers/SET_COMMON_ERRORS', error.response.data.errors, {root: true})

            return Promise.reject(error)
        }
    )

    /** End of Interceptors */
    return instance
}



























// /**
//  * Module to handle AXIOS Requests
//  */
// import axios from 'axios'
//
// export default () => {
// const instance = axios.create({
//     // baseURL: 'http://we_server.test/api/',
//     baseURL: '/api',
//     timeout: 1000,
//     headers: {'X-Custom-Header': 'foobar'}
// });
//
// return instance
//
// }
