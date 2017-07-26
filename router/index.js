const Router = require('koa-router')
const WechatAPI = require('co-wechat-api')
const config = require('../config')

const wechat = require('./wechat')
const user = require('./user')
const blog = require('./blog')

const router = new Router()

router.get('/', (ctx) => {  // 主页
  ctx.body = 'koa wechat server!'
})
router.use('/wx', wechat.routes(), wechat.allowedMethods())  // 微信业务
router.use('/user', user.routes(), user.allowedMethods())  // 用户路由
router.use('/blog', blog.routes(), blog.allowedMethods())  // 博客文章路由
module.exports = router
