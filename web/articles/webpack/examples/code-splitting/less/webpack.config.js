
module.exports = {
    entry: {
        main: './main.js'
    },

    output: {
        path: '../web/dist/',
        publicPath: '/js/',
        filename: '[name].js'
    },

    module: {
        loaders: [
            {
                test: /\.tpl$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            }
        ]
    }
};