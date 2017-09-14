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
  err: err,
  qf: {
    url: 'https://qtbsandbox.qfpay.com/',
    caller: 'server',
    app_code: 'A1C2B0C2802F515F0FCCB707D94A9A78',
    api_key: 'A430719CAC1EAF15870C74FFC54C1FAF',
    server_key: '3634F74AB616333A7C4FB5B97D861A40',
  },
  ping: {
    url: '',
    api_key: 'sk_test_mjTmr9yLOeX9u9mf50KG88W1',
    app_id: 'app_rvXnHGefLijPTOKq',
  },
}
