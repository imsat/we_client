module.exports = {
    devServer: {
        // proxy: {
        //     '^/api': {
        //         target: 'http://we_server.test',
        //         logLevel: 'debug'
        //     }
        // }

        proxy: {
            '^/api': {
                target: 'http://we_server.test',
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

