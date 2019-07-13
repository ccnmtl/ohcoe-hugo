/* eslint-disable */
const path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './static/js/src/main.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'static/js/dist')
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
    ]
}
