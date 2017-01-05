module.exports = {
    entry: "./src/index.js",
    output: {
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["react", "es2015", "stage-2"]
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js']
    }
};
