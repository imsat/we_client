/**
 * Module to perform all kinds of Functions related to Rules Section
 * import this file in the index.js
 */
export default {
    namespaced: true,
    strict: true,
    state: {
        validationRules: {
            textRules: [v => !!v || 'Field is required'],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
            // passwordRules: [
            //     v => !!v || 'Field is required',
            //     v => (!!v && v.length >= 8) || 'Min 8 characters'
            // ],
            // documentFileRules: [
            //     v => !!v || 'Field is required',
            //     v => !v || v.size < 2000000 || 'File size should be less than 2 MB!'
            // ],
            // urlRules: [
            //     v => !!v || 'URL is required',
            //     v =>
            //         /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.​\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[​6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1​,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00​a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u​00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i.test(
            //             v
            //         ) || 'URL must be valid'
            // ],
            // mobileRules: [
            //     v => !!v || 'Mobile is required'
            //     // v => /^(\+\d{1,3}[- ]?)?\d{13}$/.test(v) || 'Mobile must be valid'
            // ],
            // logoRules: [
            //     v => !!v || 'Field is required',
            //     v => !v || v.size < 2000000 || 'File size should be less than 2 MB!'
            // ]
        },
        confirmPasswordRules: {
            required: value => !!value || 'Field is required.',
            min: v => v.length >= 8 || 'Min 8 characters'
        }
    },
    getters: {},
    mutations: {},
    actions: {}
}
