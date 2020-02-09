/**
 * vue.config
 * created by eds 2019/8/22
 */
module.exports = {
  //  打包静态文件访问相对路径设置
  publicPath: "./",
  assetsDir: "libs",
  devServer: {
    proxy: {
      //配置跨域
      "/api": {
        target: "http://172.20.89.88:5001/api",
        changOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
