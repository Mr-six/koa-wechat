/**
 * 总配置文件
 * 端口
 * 文件目录等
 */
const err = require('./err')  // 错误代码

module.exports = {
  port: 3000,
  static: 'static',
  appid: 'wx561e2e008f8768ae',
  appsecret: 'ec1db659548557aca56beb77e1e1bda5',
  token: 'crazycss_token',
  err: err
}
