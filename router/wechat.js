const Router = require('koa-router')
const WechatAPI = require('co-wechat-api')  // 微信api
const config = require('../config')  // 配置文件
const wecheck = require('../src/wx/wecheck')  // 微信服务器检测

const wechat = new Router()

let {appid, appsecret, err} = config  // 微信公众号 appid 和 appsecret 错误代码 err
const api = new WechatAPI(appid, appsecret)  // 主要 api

wechat.get('/', (ctx) => {  // 主页
  ctx.body = 'wechat server'
})

wechat.get('/wecheck', wecheck)  // 服务器检测

/*
 * 获取微信js ticket
 */
wechat.get('/getTicket', async (ctx) => {
  let ticket = await api.getTicket()
  ctx.body = ticket
})

/**
 * 获取js sdk 配置调用
 * @param  {Object} get 发送参数：var param = {debug: false, jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'], url: 'http://www.xxx.com'}
 * @return {[type]}                [description]
 */
wechat.get('/getJsConfig', async (ctx) => {
  let param = ctx.query
  if (!param.url) {
    ctx.body = err.err_param()  // 参数错误
  } else {
    let jsConfig = await api.getJsConfig(param)
    ctx.body = jsConfig
  }
})

 module.exports = wechat
