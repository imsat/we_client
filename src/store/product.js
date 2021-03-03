/**
 * Module to handle Product Section
 * This will be imported in the store/index.js file
 */
import HTTP from '../__helpers/http'
import Vue from 'vue'
import toast from '../services/Notification';
import swal from '../services/SweetAlert';

export default {
    namespaced: true,
    strict: process.env.NODE_ENV !== 'production',
    state: {
        productCreateForm: {
            title: '',
            description: '',
            price: '',
            image_url: '',
        },
        productUpdateForm: {
            id: '',
            title: '',
            description: '',
            price: '',
            image_url: '',
        },
        edit_image_url: '',
        products: [],
        totalProducts: 0,
        pagination: {
            page: 1,
            itemsPerPage: 0,
            pageStart: 0,
            pageStop: 0,
            pageCount: 0,
            itemsLength: 0,
            lastPage: 0
        },
        viewProduct: {},
    },
    getters: {
        validateProductCreate(state) {
            if (state.productCreateForm.title && state.productCreateForm.price && state.productCreateForm.image_url) return true
            return false
        },
        validateProductUpdate(state) {
            if (state.productUpdateForm.title && state.productUpdateForm.price && state.productUpdateForm.image_url) return true
            return false
        },
    },
    mutations: {
        /** Set Up Product */
        SET_PRODUCT(state, products) {
            state.products = products
        },
        SET_TOTAL_PRODUCT(state, totalProducts) {
            state.totalProducts = totalProducts
        },
        /** Product Add Section */
        SET_ADD_PRODUCT_TITLE(state, title) {
            state.productCreateForm.title = title;
        },
        SET_ADD_PRODUCT_DESCRIPTION(state, description) {
            state.productCreateForm.description = description;
        },
        SET_ADD_PRODUCT_PRICE(state, price) {
            state.productCreateForm.price = price;
        },
        SET_ADD_PRODUCT_IMAGE_URL(state, image_url) {
            state.productCreateForm.image_url = image_url;
        },
        /** Product Edit Section */
        SET_EDIT_PRODUCT_FOR_EDIT(state, product) {
            state.productUpdateForm.id = product.identifier
            state.productUpdateForm.title = product.product_title
            state.productUpdateForm.description = product.product_details
            state.productUpdateForm.price = product.product_price
            // state.productUpdateForm.image_url = product.product_image_path
            state.edit_image_url = product.product_image_path
        },
        SET_EDIT_PRODUCT_TITLE(state, title) {
            state.productUpdateForm.title = title;
        },
        SET_EDIT_PRODUCT_DESCRIPTION(state, description) {
            state.productUpdateForm.description = description;
        },
        SET_EDIT_PRODUCT_PRICE(state, price) {
            state.productUpdateForm.price = price;
        },
        SET_EDIT_PRODUCT_IMAGE_URL(state, image_url) {
            state.productUpdateForm.image_url = image_url;
        },
        /** Product View Section */
        SET_VIEW_PRODUCT_FOR_VIEW(state, product) {
            state.viewProduct = product;
        },
        /** Add Product After Complete */
        ADD_PRODUCT_AFTER_COMPLETE(state, product) {
            state.products.unshift(product);
        },
        /** Update Product After Complete */
        UPDATE_PRODUCT_AFTER_COMPLETE(state, product) {
            const index = state.products.map(product => product.identifier).indexOf(product.identifier);
            if (index > -1) Vue.set(state.products, index, product);
        },
        /** Delete Product */
        UPDATE_PRODUCT_AFTER_DELETE(state, identifier) {
            const index = state.products.map(product => product.identifier).indexOf(identifier);
            if (index > -1) state.products.splice(index, 1);
        },
        /** Sey Pagination for server side */
        SET_PAGINATION(state, data) {
            state.pagination.page = data.page
            state.pagination.itemsPerPage = data.itemsPerPage
            state.pagination.pageStart = data.pageStart
            state.pagination.pageStop = data.pageStop
            state.pagination.pageCount = data.pageCount
            state.pagination.itemsLength = data.itemsLength
            data.lastPage ? state.pagination.lastPage = data.lastPage : ''
        }
    },
    actions: {
        /**
         * Get All Products
         * @param loginInfo
         */
        async getProducts({state, commit}, {event, search}) {
            try {
                //Update pagination for server side
                if (event) {
                    await commit('SET_PAGINATION', event)
                }

                return await HTTP()
                    .get('/products', {
                        params: {
                            itemsPerPage: state.pagination.itemsPerPage,
                            page: state.pagination.page,
                            ...(search ? {search: search.toLowerCase()} : {})
                        }
                    })
                    .then(response => {
                        commit('SET_PRODUCT', response.data.data)
                        commit('SET_TOTAL_PRODUCT', response.data.meta.total)

                    })
                    .catch(error => {
                        console.log(error)
                    })
            } catch (loginError) {
                console.log(loginError)
            }
        },
        /**
         * Add New Product
         * @param loginInfo
         */
        addNewProduct({state, commit}) {
            try {
                const formData = new FormData();
                formData.append('image_url', state.productCreateForm.image_url, state.productCreateForm.image_url.name)
                formData.append('title', state.productCreateForm.title)
                formData.append('description', state.productCreateForm.description)
                formData.append('price', state.productCreateForm.price)

                return HTTP()
                    .post('/products', formData)
                    .then(response => {
                        if (response.status == 201) {
                            toast.success('Product created successful');
                            commit('ADD_PRODUCT_AFTER_COMPLETE', response.data.data);
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    })

            } catch (error) {
                console.log(error)
            }
        },
        /**
         * Update Product
         * @param loginInfo
         */
        updateProduct({state, commit}) {
            try {
                //If update has any image url
                if(state.productUpdateForm.image_url){
                    const formData = new FormData();
                    formData.append('image_url', state.productUpdateForm.image_url, state.productUpdateForm.image_url.name)
                    formData.append('title', state.productUpdateForm.title)
                    formData.append('description', state.productUpdateForm.description)
                    formData.append('price', state.productUpdateForm.price)

                    return HTTP()
                        .post('/products/' + state.productUpdateForm.id, formData)
                        .then(response => {
                            if (response.status == 202) {
                                toast.success('Product updated successful');
                                commit('UPDATE_PRODUCT_AFTER_COMPLETE', response.data.data);
                            }
                        })
                        .catch(error => {
                            toast.error(error.response.data.error);
                        });

                }else{
                    return HTTP()
                        .post('/products/' + state.productUpdateForm.id, state.productUpdateForm)
                        .then(response => {
                            if (response.status == 202) {
                                toast.success('Product updated successful');
                                commit('UPDATE_PRODUCT_AFTER_COMPLETE', response.data.data);
                            }
                        })
                        .catch(error => {
                            toast.error(error.response.data.error);
                        });
                }



            } catch (error) {
                console.log(error)
            }
        },
        /**
         * Deleting Product
         * @param id
         */
        removeProduct({state, commit}, id) {
            try {
                swal.confirm((result) => {
                    if (result.value) {
                        return HTTP()
                            .delete('/products/' + id)
                            .then(response => {
                                if (response.status == 200) {
                                    toast.success('Product deleted successful');
                                    commit('UPDATE_PRODUCT_AFTER_DELETE', id);
                                }
                            })
                            .catch(error => {
                                toast.error(error.response.data.error);
                            })
                    }
                })

            } catch (error) {
                console.log(error)
            }
        },


    }
}
