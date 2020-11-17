var webpack = require("webpack");
const path = require("path");
const HappyPack = require("happypack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const NODE_ENV = process.env.NODE_ENV; //区分环境
const fs = require("fs");
const lessToJs = require("less-vars-to-js");
//const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/themes/style/theme.less'), 'utf8'));
const { getThemeVariables } = require("antd/dist/theme");
const themeVariables = getThemeVariables({
  dark: true, // 开启暗黑模式
});
themeVariables["primary-color"] = "#2485A1";
themeVariables["border-color-base"] = "#2485A1";
themeVariables["table-bg"] = "transparent";
themeVariables["table-header-bg"] = "transparent";
themeVariables["table-row-hover-bg"] = "transparent";

module.exports = {
  entry: ["./src/index.jsx"],
  //entry:['./src/routes/DataVisual/main.js'],
  output: {
    path: __dirname + "/dist/",
    filename: "bundle-[name].js",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules/",
        resolve: {
          extensions: [".js", ".jsx"],
        },
        include: path.resolve(__dirname, "src"),
        use: "HappyPack/loader?id=jsx",
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },

          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
              modifyVars: themeVariables,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name][hash:5].[ext]",
              limit: 8192,
              outputPath: "images",
            },
          },
        ],
      },
    ],
  },
  performance: {
    hints: false,
  },

  node: {
    fs: "empty",
  },

  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require("./dist/manifest.json"),
    }),
    new HappyPack({
      id: "jsx",
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-transform-runtime",
              ["@babel/plugin-proposal-decorators", { legacy: true }], //启用装饰器语法
              ["@babel/plugin-proposal-class-properties", { loose: true }], //使用箭头函数绑定事件
              "babel-plugin-syntax-dynamic-import",
              [
                "import",
                {
                  libraryName: "antd",
                  libraryDirectory: "es",
                  style: true,
                },
              ],
            ],
            cacheDirectory: true,
          },
        },
      ],
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(
          __dirname,
          "./src/routes/MapClient/components/MapBoxGL/styles"
        ),
        to: "mapboxstyle",
        ignore: [".*"],
      },
      {
        from: path.resolve(__dirname, "./src/static"),
        to: path.resolve(__dirname, "./dist"),
        ignore: [".*"],
      },
    ]),
  ],
};
