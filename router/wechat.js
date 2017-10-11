const Router = require('koa-router')
const WechatAPI = require('co-wechat-api')  // 微信api
const config = require('../config')  // 配置文件
const wecheck = require('../src/wx/wecheck')  // 微信服务器检测

const wechat = new Router()

let {err} = config  // 微信公众号 appid 和 appsecret 错误代码 err
let {appid, appsecret} = config.we

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
 * @return {Object}  返回
 * {
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，公众号的唯一标识
    timestamp: , // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名，见附录1
    jsApiList: [] // 必填，需要使用的JS接口列表
  }
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

/**
 * 设置底部菜单
 * @param  {Object} menu 菜单配置
 * @return {Object} result 返回执行结果 {"errcode":0,"errmsg":"ok"}
 */
wechat.post('/createMenu', async (ctx) => {
  let param = ctx.body
  if (!param.menu) {
    ctx.body = err.err_param()  // 参数错误
  } else {
    let menu = param.menu
    let result = await api.createMenu(menu)
    ctx.body = result
  }
})

 module.exports = wechat
