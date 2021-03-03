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
        }
    },
    transpileDependencies: [
        'vuetify'
    ],
};

