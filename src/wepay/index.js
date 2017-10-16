// 创建订单接口
const { we, schema, noDb} = require('../../config')
const $ = require('../utils')
const Payment = require('./payment')
const { orderApi, productApi} = require('../db')
const {productModel} = require('../../models').v1
const createO = require('./createOrder')  // 创建订单基础数据

const qr = require('./qr') // 生成商品二维码


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
  
  body = createO(body, ctx)
  
  // 对 body 进行对象验证
  const { error, value } = $.joi.validate(body, schema.order)  // 验证body对象
  // console.log(error)
  if (error) return ctx.body = 'params error'

  try {    
    let res = await pay.createOrder(body)  // 调用接口创建订单
    let resO = JSON.parse(res)
    resO.out_trade_no = body.out_trade_no  // 填写单号

    // console.log('这里显示输出')
    // console.dir(resO)
    ctx.body = resO
    
    if (resO.xml.return_code === 'SUCCESS' && !noDb) {  // 使用数据库
      // 订单数据库写入
      body.qrcode = resO.xml.code_url
      orderApi.payCreate(body)
    }

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
    notify_url: we.notify_url,　// 回调地址
    trade_type: 'NATIVE', // 支付类型
  }
  // 订单数据库写入
  if (!noDb) {
    orderApi.payCreate(body)
  }

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
  
  if (noDb) {
    return ctx.body = 'this is no database mode'
  }
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


/**
 * 微信订单回调
 * @param {koa} ctx 
 */
async function weCallBack (ctx) {
  let body = ctx.request.body
  // console.dir(body)
  let { xml } = body

  if (xml.return_code === 'SUCCESS') {

    let {
      transaction_id,   // 微信订单id
      out_trade_no,     // 商户订单id
      result_code,              // 支付结果
      sign,
    } = xml

    // console.log('微信支付结果1')
    // console.log(xml)

    let mysign = $.signWe(xml)

    if (mysign !== sign) {  // 签名验证失败
      console.log('签名验证失败')

      let xmlO = {
        return_code: 'FAIL',
        return_msg: '签名失败'
      }
      xmlO = $.j2x(xmlO, { header: false })
      xmlO = '<xml>' + xmlO + '<\/xml>'
      ctx.type = 'xml'
      return ctx.body = xmlO
    }

    if (result_code === 'SUCCESS') {  // 支付成功
      let query = {
        out_trade_no
      }
      let info = {
        transaction_id,
        payed: true,
      }
      

      try {
        let updata = await orderApi.payUpdata(query, info)
        // console.log('微信支付结果')    
        // console.log(xml)
        
        let xmlO = {
          return_code: 'SUCCESS',
          return_msg: 'OK'
        }
        xmlO = $.j2x(xmlO, { header: false })
        xmlO = '<xml>' + xmlO + '<\/xml>'
        ctx.type = 'xml'
        ctx.body = xmlO
        // console.log('回复支付结果')    
        // console.log(xmlO)
        
      } catch (e) {
        console.log(e)
      }
    }
    
  }  
}

/**
 * 微信扫码回调地址
 * @param {koa} ctx 
 */
async function weScancall (ctx) {
  let body = ctx.request.body
  // console.dir(body)
  let query = ctx.query 
  if (!body.xml) return ctx.body = {body,query}
  
  let { xml } = body
  let {
    product_id,     // 商品id
    openid,         // 用户openid
    sign,           // 签名
  } = xml
  
  let mysign = $.signWe(xml)
  if (mysign !== sign) {  // 签名验证失败
    console.log('签名验证失败')

    let xmlO = {
      return_code: 'FAIL',
      return_msg: '签名失败'
    }
    xmlO = $.j2x(xmlO, { header: false })
    xmlO = '<xml>' + xmlO + '<\/xml>'
    ctx.type = 'xml'
    ctx.body = xmlO
  }

  // 执行下单
  body =  createO(xml, ctx)  // 下单数据
  let data = await productModel.findById(xml.product_id)
  // console.log('查询结果')
  // console.dir(data)
  body.body = data.title  // 商品名称
  body.total_fee = data.price  // 商品价格
  body.detail = data.subtitle  // 商品简介
  body.device_info = data.device_info  // 设备编号
  body.trade_type = 'NATIVE'  // 交易类型

  try {  // 下单
    // console.log('开始下单')
    // console.dir(body)
    let res = await pay.createOrder(body)  // 调用接口创建订单
    let resO = JSON.parse(res)

    let resXml = $.j2x(resO.xml, { header: false })
    resXml = '<xml>' + resXml + '<\/xml>'
    
    ctx.type = 'xml'
    ctx.body = resXml  // 微信模式一扫码支付 回调后返回数据

    resO.out_trade_no = body.out_trade_no  // 填写单号
   
    
    
    // console.log(resXml)
    if (resO.xml.return_code === 'SUCCESS' && !noDb) {  // 使用数据库
      // 订单数据库写入
      body.qrcode = resO.xml.code_url
      orderApi.payCreate(body)
    }

  } catch (e) {
    console.dir(e)
    ctx.body = e
  }
}

// 小程序下单
async function weappCreateOrder (ctx) {
  let body = ctx.request.body
  if (!body.product_id) return ctx.body = {body}
  let product_id = body.product_id
  console.log('product_id' + product_id)

  body =  createO(body, ctx)  // 下单数据填充
  
  // 执行统一下单
  let data = await productModel.findById(product_id)
  console.log('小程序订单查询结果')
  console.dir(data)
  body.body = data.title  // 商品名称
  body.total_fee = data.price  // 商品价格
  body.detail = data.subtitle  // 商品简介
  body.device_info = data.device_info  // 设备编号
  body.trade_type = 'JSAPI'  // 交易类型 小程序
  body.appid = we.appid_app  // 小程序id


  try {  // 下单
    console.log('开始小程序下单')
    console.dir(body)
    let res = await pay.createOrder(body)  // 调用接口创建订单
    let resO = JSON.parse(res)
    console.log('小程序下单返回结果')
    console.dir(resO)

   
    // 调用再次签名 https://pay.weixin.qq.com/wiki/doc/api/wxa/wxa_api.php?chapter=7_7&index=3
    let weappParams = {
      appId: we.appid_app,
      timeStamp: $.createTimestamp(),
      nonce_str: $.createNonceStr(),
      package: resO.xml.package,
      signType: 'MD5'
    }
    weappParams.paySign = $.signWe(weappParams)  // 进行签名

    console.log('签名数据')
    console.dir(weappParams)

    ctx.body = weappParams  // 返回小程序支付所需数据
    // let resXml = $.j2x(resO.xml, { header: false })
    // resXml = '<xml>' + resXml + '<\/xml>'
    
    // ctx.type = 'xml'
    // ctx.body = resXml  // 微信模式一扫码支付 回调后返回数据

    // resO.out_trade_no = body.out_trade_no  // 填写单号
    
    // console.log(resXml)
    if (resO.xml.return_code === 'SUCCESS' && !noDb) {  // 使用数据库
      // 订单数据库写入
      body.qrcode = resO.xml.code_url
      orderApi.payCreate(body)
    }

  } catch (e) {
    console.dir(e)
    ctx.body = e
  }
}


module.exports = {
  create,
  findOne,
  test,
  testFind,
  weCallBack,
  weScancall,
  qr, // 固定二维码生成
  weappCreateOrder, // 小程序下单
}
