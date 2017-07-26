const Router = require('koa-router')
const user = new Router()

user.get('/', (ctx) => {
  ctx.body = 'user index!'
})
user.get('/:id', (ctx) => {
  ctx.body = 'user id = ' + ctx.params.id
})

module.exports = user
