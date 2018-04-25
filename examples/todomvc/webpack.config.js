module.exports = {
    mode: 'development',
    entry: __dirname + '/src/index.ts',
    output: {
        filename: 'bundle.js',
        path: __dirname + '/dist'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [
            { test: /\.tsx?$/, exclude: /node_modules/, use: "ts-loader" },
            { test: /\.jsx?$/, exclude: /node_modules/, use: "babel-loader" },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
        ]
    }
};