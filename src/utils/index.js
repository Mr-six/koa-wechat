/**
 * 1. appId 必填，公众号的唯一标识
 * 2. timestamp 必填，生成签名的时间戳
 * 3. nonceStr 必填，生成签名的随机串
 * 4. signature 必填，签名
 */

const crypto     = require('crypto')        // 加密
const { qf, we } = require('../../config')  // 钱方配置参数 // 微信配置参数
const re         = require('axios')         // axios
const xml2json   = require('xml2json')      // xml 转json
const json2xml   = require('json2xml')      // json 转 xml
const joi        = require('joi')           // 对象验证


module.exports = {
  re: re,
  x2j,
  j2x,
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
    keys.forEach(function (key) {  // 键值不为空
      if (args[key] !== '') newArgs[key.toLowerCase()] = args[key]
    })

    var string = ''
    for (var k in newArgs) {
      string += '&' + k + '=' + newArgs[k]
    }
    string = string.substr(1)
    return string
  },

  // 钱方签名
  signObj (data) {
    let sig = module.exports.raw(data)
    sig += qf.server_key
    sig = module.exports.md5(sig)
    data.sign = sig
    return data
  },
  
  // 微信支付签名
  signWe (data) {
    let sig = module.exports.raw(data)
    sig += '&key' + we.key
    sig = module.exports.md5(sig)
    data.sign = sig
    return data
  }

}
