const Router = require('koa-router')
const wepay = new Router()
const methods = require('../src/wepay')

wepay.get('/', (ctx) => {
  ctx.body = 'wepay index!'
})

wepay.get('/test', (ctx) => {
  let query = ctx.query
  ctx.body = 'test qurey' + query.test
})

// api
wepay.post('/create', methods.create)  // 订单创建
wepay.get('/findon', methods.findOne)  // 单个订单查询


module.exports = wepay