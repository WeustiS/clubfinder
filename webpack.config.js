const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.mode !== "production";
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: process.env.mode,
  entry: "./client/index.js",
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, "public/assets"), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: "bundle.js", // string    // the filename template for entry chunks
    publicPath: "/assets" // string    // the url to the output directory resolved relative to the HTML page
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        sourceMap: devMode ? true : false // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { importLoaders: 2 } },
          "postcss-loader",
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "style.css"
    })
  ],
  devServer: {
    proxy: {
      // proxy URLs to backend development server
      "*": "http://localhost:3000"
    },
    contentBase: path.join(__dirname, "public/assets"), // boolean | string | array, static file location
    hot: true // hot module replacement. Depends on HotModuleReplacementPlugin
  }
};
