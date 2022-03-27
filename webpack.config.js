const path = require("path");

module.exports = {
  entry: ["regenerator-runtime/runtime.js", "./components/app"],
  output: {
    path: path.resolve(__dirname, "assets"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  devServer: {
    writeToDisk: (filePath) => {
      return /bundle\.js$/.test(filePath);
    },
  },
};
