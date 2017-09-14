const Router = require('koa-router')
const qf = new Router()
const methods = require('../src/qf')

qf.get('/', (ctx) => {
  ctx.body = 'qf index!'
})

qf.get('/test', (ctx) => {
  let query = ctx.query
  ctx.body = 'test qurey' + query.test
})

qf.get('/token', methods.token)


module.exports = qf