/**
 * 总配置文件
 * 端口
 * 文件目录等
 */
const err    = require('./err')        // 错误代码
const qf     = require('./qf')         // 钱方
const we     = require('/we')          // 微信支付
const ping   = require('./ping')       // ping++支付
const schema = require('./schema')     // 对象验证

module.exports = {
  port: 3000,
  static: 'static',
  appid: 'wxf5dd3889c5774a3d',
  appsecret: 'ec1db659548557aca56beb77e1e1bda5',
  token: 'crazycss_token',
  err: err,
  schema: schema,
  qf,
  ping,
  we,
}
