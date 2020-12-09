// 로더가 파일 단위로 처리하는 반면 플러그인은 번들된 결과물을 처리한다.
// 번들된 자바스크립트를 난독화 한다거나 특정 텍스트를 추출하는 용도로 사용한다.
class MyWebpackPlugin {
   apply(compiler) {
      compiler.hooks.done.tap('My Plugin', (stats) => {
         console.log('MyPlugin: done');
      });

      // compilation를 통해 번들링 한 결과물에 접근이 가능
      compiler.plugin('emit', (compilation, callback) => {
         const source = compilation.assets['main.js'].source();
         compilation.assets['main.js'].source = () => {
            const banner = ['/**', ' * 이것은 BannerPlugin이 처리한 결과입니다.', ' * Build Date: 2020-12-10', ' */', ''].join('\n');
            return banner + '\n' + source;
         };

         callback();
      });
   }
}

module.exports = MyWebpackPlugin;
