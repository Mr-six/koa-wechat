const $ = require('../src/utils')
let s = 'appid=wx2a5cc65b9128ea65&nonce_str=94t8ashp8pj&package=prepay_id=wx201710161615008b8de1ce500891909558&signtype=MD5&timestamp=1508141700&key=1cb9cea97f6675eb7217e0da48b97dab'
let s2 = 'appid=wx2a5cc65b9128ea65&nonce_str=94t8ashp8pj&package=prepay_id=wx201710161615008b8de1ce500891909558&signType=MD5&timeStamp=1508141700&key=1cb9cea97f6675eb7217e0da48b97dab'
let sign = $.md5(s).toUpperCase()
let sign2 = $.md5(s2).toUpperCase()

console.log(sign + '\n' + sign2)
