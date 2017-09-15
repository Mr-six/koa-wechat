const { ping } = require('../../config')
const $ = require('../utils')
const pingpp = require('pingpp')(ping.api_key)

// const ping = ping


// 设置请求签名私钥路径
pingpp.setPrivateKeyPath(__dirname + '/my_pri.pem')


// 封装创建订单方法　返回ｐｒｏｍｉｓｅ类
function createCharge (data) {
  return new Promise(function (resolve, reject) {
    pingpp.charges.create(data, function (err, charge) {
      if (err) {
        reject(err)
      } else {
        resolve(charge)
      }
    })
  })
}

// 封装查询订单方法　返回ｐｒｏｍｉｓｅ类
function retrieveCharge (id) {
  return new Promise(function (resolve, reject) {
    pingpp.charges.retrieve(id, function (err, charge) {
      if (err) {
        reject(err)
      } else {
        resolve(charge)
      }
    })
  })
}

// // 阿里扫码支付
// pingpp.charges.create({
//   subject: "描述测试",
//   body: "测试body",
//   amount: 1,//订单总金额, 人民币单位：分（如订单总金额为 1 元，此处请填 100）
//   order_no: "11234567890",
//   channel: "alipay_qr",
//   currency: "cny",
//   client_ip: "127.0.0.1",
//   app: {id: ping.app_id}
// }, function(err, charge) {
//   if (err) console.log('err' + err)
//   console.dir(charge)
// })

// 查询订单
// pingpp.charges.retrieve(
//   'ch_bLWP80Ci9S4ODaXLSKLOGe5S',
//   function(err, charge) {
//     if (err != null){
//       console.log('pingpp.charges.retrieve failed: ', err);
//     } else {
//       console.log(charge);
//     }
//     // YOUR CODE
//   }
// );

let data ={
  subject: "描述测试",
  body: "测试body",
  amount: 1,//订单总金额, 人民币单位：分（如订单总金额为 1 元，此处请填 100）
  order_no: "123456789",
  channel: "alipay_qr",  // 微信 wx_pub_qr
  currency: "cny",
  client_ip: "127.0.0.1",
  app: {id: ping.app_id},
  // extra: {
  //   product_id: '1293012'  // 微信多出的一个参数　请参考https://www.pingxx.com/api#支付渠道-extra-参数说明
  // }
}

let id = 'ch_LqrHeHOGeLa18mLuPOGevrvT'

async function test (res) {
  try {
    let re = await createCharge(res)
    console.dir(re)
  } catch (e) {
    console.log(e)
  }
}

async function re (id) {
  try {
    let re = await retrieveCharge(id)
    console.dir(re)
  } catch (e) {
    console.log(e)
  }
}

// test(data)

// re(id)


module.exports = {
  create: createCharge,
  retrieve: retrieveCharge,
}