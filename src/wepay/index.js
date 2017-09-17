// 创建订单接口
const { we, schema} = require('../../config')
const $ = require('../utils')
const Payment = require('./payment')
const { orderApi } = require('../db')

const pay = new Payment({
  appid: we.appid,
  mch_id: we.mch_id,
})

/**
 * 订单创建函数
 * 订单号生成规则　： 设备编号-时间戳
 * ip　通过访问设备后台判断
 * 支付通知地址　we　配置文件
 * @param {koa} ctx 
 */
async function create (ctx) {
  let body = ctx.request.body

  // ip　判断
  let regip = /(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}/
  let ip = ctx.request.ip
  if (ip.match(regip)) {
    ip = ip.match(regip)[0]
  } else {
    ip = '192.168.0.1'
  }

  Object.assign(body, {
    out_trade_no: body.device_info +　'-' + $.createTimestamp(), // 订单号
    spbill_create_ip: ip,
    notify_url: we.notify_url,
  })

  // TODO 对 body 进行对象验证
  const { error, value } = $.joi.validate(body, schema.order)  // 验证body对象
  console.log(error)
  if (error) return ctx.body = 'params error'

  // 订单数据库写入
  orderApi.payCreate(body)

  try {    
    let res = await pay.createOrder(body)  // 调用接口创建订单
    let resO = JSON.parse(res)
    resO.out_trade_no = body.out_trade_no  // 填写单号
    ctx.body = resO

  } catch (e) {
    console.dir(e)
    ctx.body = e
  }
}

/**
 * 订单测试创建函数
 * @param {koa} ctx 
 */
async function test (ctx) {
  let body = {
    device_info: 'test1111',  // 设备名称
    body: '蝉鸣视觉测试',　　// 商品详情
    out_trade_no: we.device_info +　'-' + $.createTimestamp(), // 订单号
    total_fee: 1,   // 价格
    spbill_create_ip: '192.168.0.1',　// ip
    attach: '售货地点',  // 附件信息
    detail: '蝉鸣视觉荣誉出品',  // 商品描述
    notify_url: 'http://sunny.mrsix.top/',　// 回调地址
    trade_type: 'NATIVE', // 支付类型
  }
  // 订单数据库写入
  orderApi.payCreate(body)

  try {
    let res = await pay.createOrder(body)  // 调用接口创建订单
    let resO = JSON.parse(res)
    resO.out_trade_no = body.out_trade_no  // 填写单号
    ctx.body = resO
    
  } catch (e) {
    console.dir(e)
    ctx.body = e
  }
}


// 订单查询
async function testFind (ctx) {
  let query = ctx.query
  
  try {
    let res = await orderApi.payfind(query)
    ctx.body = res
  } catch (e) {
    ctx.body = 'bad query!'
  }
}

/**
 * 订单支付状态查询
 * 根据　query　参数　的　transaction_id　或者　out_trade_no　查询订单支付状态
 * @param {koa} ctx 
 */
async function findOne (ctx) {
  let query = ctx.query
  let hasKey = query.transaction_id || query.out_trade_no
  if (!hasKey) return ctx.body = 'no query!'
  
  try {
    let res = await pay.queryOrder(query)
    // console.dir(res)
    ctx.body = res
  } catch (e) {
    console.dir(e)
    ctx.body = 'bad query'
  }
}

module.exports = {
  create,
  findOne,
  test,
  testFind,
}