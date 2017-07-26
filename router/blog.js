const Router = require('koa-router')
const blog = new Router()

blog.get('/', (ctx) => {
  ctx.body = 'blog index!'
})
blog.get('/:id', (ctx) => {
  ctx.body = 'blog id = ' + ctx.params.id
})

module.exports = blog
