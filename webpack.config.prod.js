const minifier = require("terser-webpack-plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  autoPrefixPlugin = require("autoprefixer"),
  StyleExtHtmlWebpackPlugin = require("style-ext-html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const dssJS = require("dss-js");
const defaultCSS = require("./static/app-unprocessed-css.js");
// const mode = "development";
const { writeFileSync, mkdirSync } = require("fs");
const { InjectManifest } = require("workbox-webpack-plugin");
const mode = "production";
const devOrProd = (a, b) => {
  return "production" === mode ? a : b;
};
try {
  mkdirSync(__dirname + "/docs");
} catch (e) {}
writeFileSync(`${__dirname}/docs/check-sw`, +new Date());
dssJS.evaluate(defaultCSS, "./static/_App.css");
dssJS.getGlueCode("./static/css-data.js");
module.exports = {
  devServer: {
    contentBase: `${__dirname}/docs`,
    compress: !0,
    port: 4200,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules)|(injectables)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: "3.3.5",
                  targets: [
                    "last 2 Chrome versions",
                    "last 2 Safari versions",
                    "last 2 iOS versions",
                    "last 2 Firefox versions"
                  ]
                }
              ]
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              "@babel/plugin-syntax-dynamic-import",
              "@babel/plugin-proposal-class-properties"
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: { ident: "postcss", plugins: [autoPrefixPlugin()] }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [{ loader: "url-loader", options: { fallback: "file-loader" } }]
      }
    ]
  },
  entry: `${__dirname}/static/App.js`,
  output: { path: `${__dirname}/docs`, filename: "[name]-[contenthash].js" },
  mode,
  optimization: {
    minimizer: devOrProd([new minifier({ parallel: !0 })], []),
    splitChunks: {
      chunks: "all"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: `${__dirname}/index.html`,
      xhtml: !0,
      favicon: "./favicon.ico",
      minify: devOrProd(
        {
          collapseBooleanAttributes: !0,
          collapseWhitespace: !0,
          html5: !0,
          minifyCSS: !0,
          removeEmptyAttributes: !0,
          removeRedundantAttributes: !0
        },
        !1
      )
    }),

    new WebpackPwaManifest({
      background_color: "#e3e3e3",
      description: "Client Side File Encryption",
      display: "standalone",
      fingerprints: !0,
      icons: [
        {
          src: `${__dirname}/icon-512x512.png`,
          sizes: [72, 96, 128, 144, 152, 192, 256, 384, 512]
        }
      ],
      inject: !0,
      lang: "en",
      name: "cryptex",
      start_url: "/",
      short_name: "cryptex",
      theme_color: "#1976d2",
      ios: true
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-[contenthash].css",
      chunkFilename: "[id]-[contenthash].css"
    }),
    new StyleExtHtmlWebpackPlugin({
      minify: devOrProd(!0, !1),
      position: "head-bottom"
    }),
    new InjectManifest({
      swDest: "sw-stream.js",
      swSrc: `${__dirname}/static/sw/sw-stream.js`,
      importWorkboxFrom: "disabled"
    })
  ]
};
