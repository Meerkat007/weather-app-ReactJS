var webpack = require('webpack');
var path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: [
        './scripts'
    ],
    output: {
        path: path.join('../app'),
        filename: 'weatherApp.js'
    }
    
}