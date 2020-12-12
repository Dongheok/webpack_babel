// 웹팩 설정
const path = require('path');
const webpack = require('webpack');

const childProcess = require('child_process');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
   // process.env.NODE_ENV
   mode: 'development',
   entry: {
      main: './src/app.js',
   },
   output: {
      path: path.resolve('./dist'),
      filename: '[name].js',
   },
   // 로더
   module: {
      rules: [
         // js 로더
         // {
         //    test: /\.js$/,
         //    use: [
         //       path.resolve('./my-webpack-loader.js')
         //    ],
         // },
         {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
         },
         // css 로더, style 로더
         {
            test: /\.css$/,
            use: [process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
         },
         // file 로더 :용량이 큰 이미지
         // url 로더 : 용량이 작은 이미지 limit 넘으면 file-loader 처리
         {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url-loader',
            options: {
               // publicPath: './',
               name: '[name].[ext]?[hash]',
               limit: 20000, // 2kb
            },
         },
      ],
   },
   // 커스텀 터미널 환경설정$env:NODE_ENV="production"
   plugins: [
      // 배너 플러그인 : 번들링된 결과물js 상단에 맨 위 설명
      new webpack.BannerPlugin({
         banner: `
         Build Date : ${new Date().toLocaleString()}
         Commit Version : ${childProcess.execSync('git rev-parse --short HEAD')}
         Author : ${childProcess.execSync('git config user.name')}
         `,
      }),
      // 정의 플러그인 : 환경변수 정의
      new webpack.DefinePlugin({
         TWO: '1+1',
         'api.domain': JSON.stringify('http://dev.api.domain.com'),
      }),
      // HtmlWebpackPlugin : html 파일을 동적으로 만드는데 사용 ex: title, 공백제거, 주석푸기
      new HtmlWebpackPlugin({
         template: './index.html',
         templateParameters: {
            env: process.env.NODE_ENV === 'development' ? '(개발용)' : '(상용)',
         },
         minify:
            process.env.NODE_ENV === 'production'
               ? {
                    // 공백제거
                    collapseWhitespace: true,
                    // 주석제거
                    removeComments: true,
                 }
               : false,
      }),
      // CleanWebpackPlugin : 빌드 이전 결과물을 제거하는 플러그인이다.
      new CleanWebpackPlugin({}),
      // MiniCssExtractPlugin : 번들된 자바스크립트 코드에서 css파일만 따로 뽑아 css파일을 만들어 html head에 참조시킨다
      ...(process.env.NODE_ENV === 'production'
         ? [
              new MiniCssExtractPlugin({
                 filename: '[name].css',
              }),
           ]
         : []),
   ],
};
