const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.bundle.js'
    },
    devtool: 'inline-source-map',
    mode: 'development',
    // CSS and file (image) loaders
    module: {
        rules: [{
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'less-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/',
                        publicPath: 'images/'
                    }
                }]
            }
        ],
    },
    // Below is needed for webpack-dev-server
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        })
    ],
    devServer: {
        contentBase: './dist'
    }
};