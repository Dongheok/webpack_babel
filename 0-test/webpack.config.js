const path = require('path');

// define-plugin 관련
const webpack = require('webpack');
const childProcess = require('child_process');
// html-webpack-plugin 관련 (버젼 5 이상쓰면 안됨)
const HtmlWebpackPlugin = require('html-webpack-plugin');
// clean-webpack-plugin 관련 (빌드할때마다 날리고 새로 받는 플러그인)
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// mini-css-extract-plugin 관련 (자바스크립트에서 css를 다 뽑아서 합치는 플러그인)
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
   mode: 'development',
   entry: {
      main: './app.js',
   },
   output: {
      path: path.resolve('./dist'),
      filename: '[name].js',
   },
   module: {
      rules: [
         {
            test: /\.css$/,
            use: [process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
         },
         {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url-loader',
            options: {
               name: '[name].[ext]?[hash]',
               limit: 20000, //20kb미만은 url-loader를 이용해 자바스크립트 문자열로 변환, 그 이상은 file-loader로 output에 파일을 복사
            },
         },
         {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
         },
      ],
   },
   plugins: [
      // 웹팩된 번들파일 맨 위에 원하는걸 추가할 수 있는 플러그인
      new webpack.BannerPlugin({
         banner: `
            Build Date : ${new Date().toLocaleDateString()}
            Commit Version : ${childProcess.execSync('git rev-parse --short HEAD')}
            Author : ${childProcess.execSync('git config user.name')}
         `,
      }),
      // 환경변수관련된 플러그인
      new webpack.DefinePlugin({
         TWO: '1+1',
         'api.domain': JSON.stringify('http://dev.api.domain.com'),
      }),
      new HtmlWebpackPlugin({
         template: './src/index.html',
         templateParameters: {
            env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
         },
         minify: process.env.NODE_ENV
            ? {
                 collapseWhitespace: true,
                 removeComments: true,
              }
            : false,
      }),
      new CleanWebpackPlugin({}),
      ...(process.env.NODE_ENV === 'production'
         ? [
              new MiniCssExtractPlugin({
                 filename: '[name].css',
              }),
           ]
         : []),
   ],
};
