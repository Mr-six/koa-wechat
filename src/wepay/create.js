// 创建订单接口
const { we, schema} = require('../../config')
const $ = require('../utils')
const Payment = require('./payment')

const pay = new Payment({
  appid: we.appid,
  mch_id: we.mch_id,
})

/**
 * 订单创建函数
 * @param {koa} ctx 
 */
async function create (ctx) {
  let body = ctx.request.body

  // TODO 对 body 进行对象验证
  const { error, value } = $.joi.validate(body, schema.order)  // 验证body对象
  $.debug(error)
  if (error) return ctx.body = 'params error'
  try {
    let res = await pay.createOrder(body)  // 调用接口创建订单
    console.dir(res)
    ctx.body = res
  } catch (e) {
    console.dir(e)
    ctx.body = e
  }
}

/**
 * 订单查询函数
 * @param {koa} ctx 
 */
async function findOne (ctx) {
  let query = ctx.query
  let transaction_id = query.transaction_id
  if (transaction_id) return ctx.body = 'no transaction_id'
  
  try {
    let res = await pay.queryOrder({transaction_id})
    console.dir(res)
    ctx.body = res
  } catch (e) {
    console.dir(e)
    ctx.body = e
  }
  
}