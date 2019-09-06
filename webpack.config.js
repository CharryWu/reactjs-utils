/* eslint-disable no-unused-vars */
const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const getAliases = require('./webpack.alias.config').default
const getModuleRules = require('./webpack.module.rules.config').default
const getPlugins = require('./webpack.plugins.config').default

module.exports = (env = {}) => {
    let productionMode = env.production
    let serverMode = env.server
    let unminifyMode = env.unminify
    let generateSourceMap = env.sourcemap

    return {
        //the base directory (absolute path) for resolving the entry option
        devtool: generateSourceMap
            ? 'source-map'
            : '',
        mode: productionMode
            ? 'production'
            : 'development',
        context: __dirname,
        // the entry point we created earlier. Note that './' means your current
        // directory. You don't have to specify the extension  now, because you will
        // specify extensions later in the `resolve` section
        entry: (() => {
            if (serverMode || productionMode) {
                return ['./src/index']
            } else {
                // Enable HMR
                return ['webpack-dev-server/client?http://localhost:3000', 'webpack/hot/only-dev-server', './src/index']
            }
        })(),
        output: (() => {
            let output = {
                path: path.resolve('../lecture-viewer-redux-deploy/bundles/'),
                filename: '[name]-[hash].js',
                chunkFilename: '[name]-[chunkhash].bundle.js',
            }

            if (serverMode) {
                output = {
                    ...output,
                    publicPath: 'https://evt-lect-dev.s3.amazonaws.com/static/bundles/'
                }
            } else if (productionMode) {
                output = {
                    ...output,
                    publicPath: 'http://0.0.0.0:8080/static/bundles/'
                }
            } else {
                output = {
                    ...output,
                    publicPath: 'http://localhost:3000/static/bundles/'
                }
            }

            return output
        })(),
        plugins: getPlugins(productionMode),
        optimization: {
          minimizer: unminifyMode ? [] : [new UglifyJSPlugin({
                    cache: true,
                    parallel: true,
                    uglifyOptions: {
                        compress: {
                            drop_console: true
                        },
                        ecma: 6,
                        mangle: true
                    },
                    sourceMap: true
                })]
        },
        module: {
            rules: getModuleRules(productionMode)
        },
        resolve: {
            //tells webpack where to look for modules
            modules: [
                'node_modules', 'src'
            ],
            //extensions that should be used to resolve modules
            extensions: [
                '.ts', '.tsx', '.js', '.jsx'
            ],
            alias: getAliases(path,__dirname)
        }
    }
}
