const Router = require('koa-router')
const WechatAPI = require('co-wechat-api')
const config = require('../config')
const fs = require('fs')

const wechat = require('./wechat')
const user = require('./user')
const blog = require('./blog')
const qf = require('./qf')
const ping = require('./pingpp')
const wepay = require('./wepay')
const weapp = require('./weapp')

const router = new Router()

router.get('/', (ctx) => {  // 主页
  ctx.body = 'koa wechat server!'
})


router.use('/wx', wechat.routes(), wechat.allowedMethods())  // 微信业务
router.use('/weapp', weapp.routes(), weapp.allowedMethods()) // 微信小程序
router.use('/user', user.routes(), user.allowedMethods())  // 用户路由
router.use('/blog', blog.routes(), blog.allowedMethods())  // 博客文章路由
router.use('/qf', qf.routes(), wechat.allowedMethods())    // 钱方接口
router.use('/ping', ping.routes(), ping.allowedMethods())  // ping++ 接口
router.use('/wepay', wepay.routes(), wepay.allowedMethods())  // 微信支付 接口

module.exports = router
