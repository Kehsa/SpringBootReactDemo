const path = require('path');

module.exports = {
    cache: true,
    mode: 'development',
    // mode: 'production',
    entry: './webpack_src/index.tsx',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /(node_modules)/,
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        path: path.resolve("./src/main/resources/static/src"),
        filename: "bundle.js"
    }
}