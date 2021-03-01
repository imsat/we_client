module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://we_server.test',
                logLevel: 'debug'
            }
        }
    },
    transpileDependencies: [
        'vuetify'
    ],
};
