const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const tsImportPluginFactory = require('ts-import-plugin')

module.exports = {
  mode: "development",
  devtool: false,
  // devtool: 'hidden-source-map',
  entry: "./src/index.tsx",
  output: {
    path: path.join(__dirname, "./public"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts", ".d.ts"],
    fallback: { "util": false },
  },
  experiments: {
    topLevelAwait: true,
  },
  optimization: {
    // usedExports:false,
    // providedExports: false,
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 5,
      name: false,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          reuseExistingChunk: true,
          priority: -10,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        include: [path.resolve(__dirname, "./src")],
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
              happyPackMode: true,
              getCustomTransformers: () => ({
                before: [ tsImportPluginFactory({
                    libraryName: '@terminus/nusi',
                    libraryDirectory: 'es',
                    style: true
                })]
              }),
            },
          },
        ],
      },
      {
        test: /\.(css)$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        // include: [resolve("node_modules/@terminus/nusi")],
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024, // 4kb
          },
        },
      },
      {
        test: /\.(scss)$/,
        // include: [
        //   resolve('app'),
        //   resolve('node_modules/@terminus/nusi'),
        // ],
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
              additionalData: `@import "src/theme";@import "node_modules/@terminus/nusi/styles/_theme.scss";`,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        // include: [
        //   resolve('node_modules/@terminus/nusi'),
        // ],
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
    }),
  ],
};
