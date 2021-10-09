const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "index.js",
    library: "Modal",
    libraryTarget: "umd",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
          }
        ],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader"
          },
          { loader: "sass-loader" }
        ],
      },
      {
        test: /\.(ttf|eot|woff|svg|woff2)/,
        use: "file-loader",
      },
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
    ],
  },

  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
