/**
 * 1. appId 必填，公众号的唯一标识
 * 2. timestamp 必填，生成签名的时间戳
 * 3. nonceStr 必填，生成签名的随机串
 * 4. signature 必填，签名
 */

const crypto = require('crypto')
const { qf } = require('../../config')
let re = require('axios')

module.exports = {
  re: re,
  // sha1加密
  sha1 (str) {
    let shasum = crypto.createHash("sha1")
    return shasum.update(str).digest("hex")
  },

  // md5 加密
  md5 (srt) {
    let md5 = crypto.createHash('md5')
    return md5.update(srt).digest('hex')
  },

  /**
 * 生成签名的时间戳
 * @return {字符串} 
 */
  createTimestamp () {
    return parseInt(new Date().getTime() / 1000) + ''
  },

  /**
 * 生成签名的随机串
 * @return {字符串} 
 */
  createNonceStr () {
    return Math.random().toString(36).substr(2, 15)
  },

  /**
 * 对参数对象进行字典排序
 * @param  {对象} args 签名所需参数对象
 * @return {字符串}    排序后生成字符串
 */
  raw (args) {
    var keys = Object.keys(args)
    keys = keys.sort()
    var newArgs = {}
    keys.forEach(function (key) {
     newArgs[key.toLowerCase()] = args[key]
    })

    var string = ''
    for (var k in newArgs) {
      string += '&' + k + '=' + newArgs[k]
    }
    string = string.substr(1)
    return string
  },

  signObj (data) {
    let sig = module.exports.raw(data)
    sig += qf.server_key
    sig = module.exports.md5(sig)
    data.sign = sig
    return data
  }

}
