const path = require("path");

module.exports = {
  // mode: "development",
  devtool: false,
  // devtool: 'hidden-source-map',
  entry: "./src/entry.tsx",
  output: {
    path: path.join(__dirname, "./public"),
    filename: "[name].js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts", ".d.ts"],
  },
  optimization: {
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
            },
          },
        ],
      },
    ],
  },
};
