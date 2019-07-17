const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/static/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'src/dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'main.html',
            template: path.resolve(__dirname, 'src/static/templates/main.html'),
            inject:true
        })
    ]
};