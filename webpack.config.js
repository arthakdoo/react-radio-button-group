module.exports = {
    entry: "./src/index.js",
    output: {
        filename: 'bundle.js',
        library: 'ReactRadioGroup',
        libraryTarget: 'umd',
        path: 'build'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    presets: ["react", "es2015"]
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js']
    }
};
