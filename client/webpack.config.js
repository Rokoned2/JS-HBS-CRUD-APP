const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: {
    	index: path.resolve(__dirname, "js", "main.js")
    },
    output: {
    	path: path.resolve(__dirname, "build"),
      filename: "main-bundle.js"
  	},
  	plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, "index.html")

    })
  ],
  resolve: {
    fallback: {
      layout: path.resolve(__dirname,"js", 'layout.js')
    }
  },
  devServer: {
    publicPath: '/build/'
  },
  watchOptions: {
    ignored: /node_modules/
  },
    mode: 'development',
      watch: true,
     module: {
    rules: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader'
      },
       {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
};