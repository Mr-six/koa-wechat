const Router = require('koa-router')
const wepay = new Router()
const methods = require('../src/wepay')

wepay.get('/', (ctx) => {
  ctx.body = 'wepay index!'
})

wepay.get('/test', methods.test)  // 微信支付测试

// api
wepay.post('/create', methods.create)  // 订单创建
wepay.get('/findon', methods.findOne)  // 单个订单查询


module.exports = wepay