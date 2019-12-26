// module.exports = {
//     baseUrl: './',
//     assetsDir: 'static',
//     productionSourceMap: false,
//     devServer: {
//         proxy: {
//             '/':{
//                 target:' http://192.168.1.179:9000/', // 开发环境
//                 // target:'https://api.24ud.cn', // 测试环境
//                 changeOrigin:true,
//                 pathRewrite:{
//                     '/':''
//                 }
//             }
//         }nginx 配置多个代理http
//     }
// }



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
     runtimeCompiler: true,
      publicPath: '/', // 设置打包文件相对路径 
      devServer: { 
          // open: process.platform === 'darwin', 
          // host: 'localhost', 
          port: 8000, // 
          open: true, //配置自动启动浏览器
          proxy: { 
              '/api': {
                  // target: 'http://192.168.1.153:8080/', //开发环境
                   target: 'https://api.qincangyuncang.com/', //正式环境
                  changeOrigin: false,
                   ws: false,
                  pathRewrite: {
                      '/api': ''
                    }
                 },
              '/map': {
                  target: 'http://restapi.amap.com/', //正式环境
                  changeOrigin: false,
                  ws: false,
                  pathRewrite: {
                      '/map': ''
                  }
              }
          }
            },
         }
