const Koa = require('koa')

const bodyParser = require('koa-bodyparser')

const app = new Koa()

const config = require('./config')

const router = require('./router')

// 使用ctx.body解析中间件
app.use(bodyParser({
  extendTypes: {
    json: ['application/x-javascript'] // will parse application/x-javascript type body as a JSON string
  },
  onerror: function (err, ctx) {  // support custom error handle, if koa-bodyparser throw an error
    ctx.throw('body parse error', 422)
  }
}))

app.use(router.routes())

app.listen(config.port, () => {
  console.log('server start at http://localhost:' + config.port)
})
