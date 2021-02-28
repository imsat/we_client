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
            Accept: '*/*',
            Authorization: `Bearer ${store.state.authentication.token}`,
            // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjEsImlhdCI6MTU0NzIxMjQ2Mn0.ycQN0kGWQnjVTaC8p5gz2pQoAu30Pbge4rC3GHmI9D4`,
            locale: 'en'
        }
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

            const originalRequest = error.config

            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true
                store.commit('authentication/REMOVE_TOKEN')
                router.push('/')
            }

            /** Global loader */
            store.commit('__helpers/SET_IS_LOADING', true, {root: true})
            store.commit('__helpers/SET_COMMON_ERRORS', error.response, {root: true})

            return Promise.reject(error)
        }
    )

    /** End of Interceptors */
    return instance
}
