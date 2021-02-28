export default {
    namespaced: true,
    strict: process.env.NODE_ENV !== 'production',
    state: {
        isLoading: false,
        isActiveDrawer: false,
        isActiveDialog: {
            dialog: false,
            activator: ''
        },
        isActive: {
            modal: false,
            name: ''
        },
        /** Errors */
        /** If need two errors in single page then declare another error variables with new name */
        commonErrors: [],
    },
    getters: {},
    mutations: {
        /** Set global loader */
        SET_IS_LOADING(state) {
            state.isLoading = !state.isLoading;
        },
        /** Set global drawer activator*/
        SET_IS_ACTIVE_DRAWER(state, value) {
            state.isActiveDrawer = value
        },
        /** Set global dialog activator*/
        SET_IS_ACTIVE_DIALOG(state, value) {
            state.isActiveDialog.dialog = value.dialog
            state.isActiveDialog.activator = value.activator
        },
        /** Set global modal activator*/
        SET_IS_ACTIVE(state, value) {
            state.isActive.modal = value.modal
            state.isActive.name = value.name
        },
        /** Errors Handling */
        SET_COMMON_ERRORS(state, errors) {
            state.commonErrors = errors
        },
    },
    actions: {}
}
