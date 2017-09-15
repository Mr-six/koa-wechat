const { orderApi } = require('../src/db')
// const $ = require('../src/utils')

// console.dir($)

console.dir(orderApi)

let data = {
  device_info: 'test1111',
  body: 'test bosy',
  out_trade_no: '123123',
  total_fee: 100,
  spbill_create_ip: '192.168.0.1',
  attach: '售货地点',
}

orderApi.test().then(data => {
  console.log(data)
}).catch(e => {
  console.log(e)
})

// async function cre (d) {
//   try {
//     let res = await orderApi.test(d)
//     console.dir('yy')
//     console.dir(res)
//   } catch (e) {
//     console.dir('jjjjj')
//     console.dir(e)
  
//   }
// }
// cre(data).then(function(d) {
//   console.log(d)
// })

