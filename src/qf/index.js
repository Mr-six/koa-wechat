const { qf } = require('../../config')
const $ = require('../utils')
// console.dir($)

module.exports = {
  async token (ctx) {
    let datas = {  // 获取token所需参数
      caller: qf.caller,
      app_code: qf.app_code,
      out_user: '000001',
      mobile: '13200000000',
    }
    let signO = $.signObj(datas)
    console.dir(signO)
    // let getStr = $.raw(signO)
    let getStr = qf.url + 'auth/v1/token?' + $.raw(signO)
    console.log(getStr)
    // let test = 'http://localhost:3000/qf/test?test=hhhh'

    // let res = await $.re.get(getStr).query({'token': $.raw(signO)})
    let {err, data} = await $.re.get(getStr)
    if (err) console.log("err")
    console.dir(data)
    ctx.body = data
  }
}