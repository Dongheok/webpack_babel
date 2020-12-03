const path = require('path');

module.exports = {
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
         // css 로더, style 로더, file 로더
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
         },
         {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'url-loader',
            options: {
               publicPath: './dist/',
               name: '[name].[ext]?[hash]',
               limit: 20000, // 2kb
            },
         },
      ],
   },
};
