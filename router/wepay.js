const Router = require('koa-router')
const wepay = new Router()
const { orderApi, productApi} = require('../src/db')
const methods = require('../src/wepay')

// 测试页面
wepay.get('/', (ctx) => {
  let regip = /(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}/
  let ip = ctx.request.ip
  if (ip.match(regip)) {
    ip = ip.match(regip)[0]
  } else {
    ip = '192.168.0.2'
  }
  ctx.body = 'wepay index! ip:' + ip
})


wepay.get('/test', methods.test)  // 微信支付测试
// wepay.get('/scancode', methods.qr)  // 微信支付测试


/**
 * 订单创建
 * post 参数
 * device_info 设备编号　最多　20 位字符串
 * total_fee　商品价格　单位　分
 * body　商品名称
 * trade_type: 'NATIVE', // 支付类型
 * detail　商品详情　(可省略)
 * attach：备注信息（可省略）
 */
wepay.post('/create', methods.create)       // 订单创建


/**
 * 生成商品固定二维码
 * product_id: 商品id
 */
wepay.get('/scancode', methods.qr)


/**
 * 订单支付状态查询
 * get 参数　{query 对象　根据订单参数进行筛选}
 */
wepay.get('/orderlist', methods.testFind)   // 订单列表查询

/**
 * 订单支付状态查询
 * get 参数　out_trade_no　或者　transaction_id　二选一
 * 返回结果 trade_state 为　NOTPAY　或者　SUCCESS
 */
wepay.get('/findone', methods.findOne)      // 单个订单状态查询


// 商品接口
wepay.post('/creatProd', productApi.create)  // 创建商品

wepay.get('/findProduct', productApi.all)  // 商品查询findById

wepay.get('/findProductByid', productApi.findById)  // 根据id查询单个商品

wepay.post('/deleteProd/:id', productApi.delete)  // 删除商品

wepay.post('/updateProd/:id', productApi.update)  // 更新商品信息

/**
 * 微信支付回调函数
 * 
 */
wepay.post('/wecallback',methods.weCallBack)


// 微信扫码回调
wepay.post('/wescancall', methods.weScancall)


module.exports = wepay