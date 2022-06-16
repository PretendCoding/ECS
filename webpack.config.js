const webpack = require('webpack');
const path = require('path');

module.exports = (env, argv) => {
    return ({
        entry: './src/public/js/index.ts',

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: './public/js/index.js'
        },

        performance: { hints: false },

        devtool: argv.mode === 'development' ? 'eval-source-map' : undefined,

        module: {
            rules: [
                {
                    test: /\.ts(x)?$/,
                    loader: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: [
                '.tsx',
                '.ts',
                '.js'
            ]
        }
    });
}