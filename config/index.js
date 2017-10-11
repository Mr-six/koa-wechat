/**
 * 总配置文件
 * 端口
 * 文件目录等
 */
const isProd   =  process.env.NODE_ENV === 'production'  // 是否为
const noDb   =  process.env.NODE_ENV === 'noDb'  // 是否使用数据库
const err    = require('./err')        // 错误代码
const qf     = require('./qf')         // 钱方
const we     = require('./we')          // 微信支付
const ping   = require('./ping')       // ping++支付
const schema = require('./schema')     // 对象验证

module.exports = {
  isProd,
  cors: {origin: '*'},                      // 允许跨域
  noDb,
  db: 'mongodb://127.0.0.1:27017/koams',    // 数据库
  dbtest: 'mongodb://127.0.0.1:27017/test', // 测试数据库
  port: 8003,
  static: 'static',
  appid: 'wxf5dd3889c5774a3d',
  appsecret: 'ec1db659548557aca56beb77e1e1bda5',
  token: 'crazycss_token',
  tokenExpires: '7d',                       // token 有效时间 7天
  secret: 'Chanvr',
  err: err,
  schema: schema,
  qf,
  ping,
  we,
}
