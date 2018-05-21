module.exports = {
    entry: './src/js/main.js',
    output: {
        path: `${__dirname}/dist/js`,
        filename: 'bundle.js'
    },
    watch: true,
    mode: "development",
    devtool: "source-map",
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                "presets": [
                    ["env", {
                        "targets": {
                            "browsers": ["> 1%"]
                        }
                    }],
                    ["babel-polyfill"]
                ]
            }
        }],
    }
}