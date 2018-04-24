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
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                query: {
                    configFileName: __dirname + '/tsconfig.json'
                }
            },
        ]
    }
};