const Koa = require('koa')

const bodyParser = require('koa-bodyparser')
const xmlParser = require('koa-xml-body')

const app = new Koa()

const config = require('./config')

const router = require('./router')

const serve = require('koa-static')


app.use(serve('./src'))

// xml解析中间价
app.use(xmlParser())

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

require('./models').connect()  // 数据库链接

app.listen(config.port, () => {
  console.log('server start at http://localhost:' + config.port)
})
