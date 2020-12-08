module.exports = {
  publicPath: './',
  devServer: {
    // 这里的‘/api’就指向了127.0.0.1:3000
    proxy:{
      "/api": { 
        target: "http://localhost:3000", // 接口域名
        changeOrigin: true,  //是否跨域
        pathRewrite: {
          "^/api": "" //需要rewrite的,
        }
      }
    }
   }
}