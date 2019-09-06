const webpack = require('webpack')
const BundleTracker = require('webpack-bundle-tracker')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

/**
 * Decentralized configuration for webpack plugins
 * @param {boolean} productionMode
 * @return {Array.<object>} an array of plugins to be used in `webpack.config.js`
 */
exports.default = function(productionMode) {
    let pluginsArrays = []
    if (productionMode) {
        pluginsArrays.push(new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }))
    } else {
        // Enable HMR
        pluginsArrays.push(new webpack.LoaderOptionsPlugin({debug: true}))
        pluginsArrays.push(new webpack.HotModuleReplacementPlugin())
        pluginsArrays.push(new webpack.NoEmitOnErrorsPlugin())
    }

    // pluginsArrays.push(new BundleAnalyzerPlugin({openAnalyzer: false, generateStatsFile: true, analyzerMode: 'static', reportFilename: '../report.html'}))
    pluginsArrays.push(new BundleTracker({filename: '../lecture-viewer-redux-deploy/webpack-stats.json'}))
    pluginsArrays.push(new webpack.ProvidePlugin({ReactGA: 'react-ga'}))

    return pluginsArrays
}
