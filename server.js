const Koa = require('koa')
const app = new Koa()

const config = require('./config')

const router = require('./router')

app.use(router.routes())

app.listen(config.port, () => {
  console.log('server start at http://localhost:' + config.port)
})
