const Router = require('koa-router')
const ping = new Router()
const methods = require('../src/pingpp')

ping.get('/', (ctx) => {
  ctx.body = 'ping index!'
})

ping.get('/test', (ctx) => {
  let query = ctx.query
  ctx.body = 'test qurey' + query.test
})

ping.get('/find',methods.findOne)  　// 查询单个订单

ping.post('/charge', methods.create)  // 创建订单

module.exports = ping