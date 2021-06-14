module.exports = {
   presets: [
      [
         '@babel/preset-env',
         {
            targets: {
               chrome: '79',
               ie: '11',
            },
            // 폴리필 사용 방식 지정
            useBuiltIns: 'usage', // 'entry', false
            corejs: {
               // 폴리필 버전 지정
               version: 2, // 3
            },
         },
      ],
   ],
};
