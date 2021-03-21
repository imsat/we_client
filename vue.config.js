module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'https://api.satyajitmondal.com',
                changeOrigin: true,
                secure: false,
                pathRewrite: {'^/api': '/api/'},
                logLevel: 'debug'
            },
        },
        allowedHosts: ['api.satyajitmondal.com'],
        overlay: {
            warnings: true,
            errors: true
        }
    },
    transpileDependencies: [
        'vuetify'
    ],
};

