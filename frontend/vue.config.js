const BundleTracker = require("webpack-bundle-tracker");
const path = require('path');

const DEPLOYMENT_PATH = '/dist'

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? process.env.DEPLOYMENT_PATH :
    'http://localhost:8080/',
    outputDir: './dist',

    configureWebpack: {

        plugins: [
            new BundleTracker({path: __dirname, filename: 'webpack-stats.json'}),

        ],
    },
    "transpileDependencies": [
        "vuetify"
    ],

    chainWebpack: (config) => {


        config.resolve.alias.set("__STATIC__", "static");

        config.devServer
            .public("http://127.0.0.1:8080")
            .host("0.0.0.0")
            .port(8080)
            .hotOnly(true)
            .watchOptions({poll: 1000})
            .https(false)
            .disableHostCheck(true)
            .headers({"Access-Control-Allow-Orgin": ['*']})
    }
};
