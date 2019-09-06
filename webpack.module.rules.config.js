/**
 * Decentralized configuration for webpack module.rules
 * @param {boolean} productionMode
 * @return {Array.<object>} module rules
 */
exports.default = function(productionMode) {
    return [{
            enforce: 'pre',
            test: /\.js$/,
            exclude: [
                '/node_modules/', '/src/extra/'
            ],
            loader: 'eslint-loader',
            options: {
                configFile: productionMode ? '' : './dev.eslintrc',
            }
        }, {
            test: /\.css$/,
            loader: ['style-loader', 'css-loader', 'postcss-loader']
        }, {
            test: /\.(j)sx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.(jpe?g|png|gif|svg)$/i,
            loader: 'file-loader',
            options: {
                name: 'sha512:hash:base64:7].[ext]'
            }
        }
    ]
}