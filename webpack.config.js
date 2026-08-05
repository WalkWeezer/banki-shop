const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

/** @type {import('webpack').Configuration} */
module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  const publicPath = process.env.PUBLIC_PATH || '/';

  return {
    entry: path.resolve(__dirname, 'src/main.ts'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isProd ? 'js/[name].[contenthash:8].js' : 'js/[name].js',
      assetModuleFilename: 'assets/[name].[hash:8][ext]',
      clean: true,
      publicPath,
    },
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        vue$: 'vue/dist/vue.esm.js',
      },
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            appendTsSuffixTo: [/\.vue$/],
            transpileOnly: true,
          },
        },
        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'sass-loader',
              options: {
                additionalData: `@import "@/assets/styles/variables.scss";`,
                api: 'legacy',
                sassOptions: {
                  quietDeps: true,
                  silenceDeprecations: ['import', 'legacy-js-api'],
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: ['vue-style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|svg|webp)$/i,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024,
            },
          },
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]',
          },
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'index.html'),
        title: 'Banki.shop — Картины эпохи возрождения',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public/images'),
            to: path.resolve(__dirname, 'dist/images'),
          },
        ],
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(isProd ? 'production' : 'development'),
        __BASE_URL__: JSON.stringify(publicPath),
      }),
    ],
    devServer: {
      static: [
        {
          directory: path.resolve(__dirname, 'public/images'),
          publicPath: '/images',
        },
      ],
      historyApiFallback: true,
      port: 8080,
      hot: true,
      open: true,
      client: {
        overlay: true,
      },
    },
    devtool: isProd ? 'source-map' : 'eval-cheap-module-source-map',
    performance: {
      hints: false,
    },
  };
};
