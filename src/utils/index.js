/**
 * 1. appId 必填，公众号的唯一标识
 * 2. timestamp 必填，生成签名的时间戳
 * 3. nonceStr 必填，生成签名的随机串
 * 4. signature 必填，签名
 */

const crypto     = require('crypto')        // 加密
// const { qf, we } = require('../../config')  // 钱方配置参数 // 微信配置参数
const we         = require('../../config/we')
const re         = require('axios')         // axios
const xml2json   = require('xml2json')      // xml 转json
const json2xml   = require('json2xml')      // json 转 xml
const joi        = require('joi')           // 对象验证
const moment     = require('moment')        // 时间格式和


module.exports = {
  re: re,
  x2j: xml2json.toJson,
  j2x: json2xml,
  joi,
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
    keys.forEach(function (key) {  // 键值不为空 且不等于sign
      if (args[key] !== '' && key !== 'sign') newArgs[key] = args[key]
    })

    var string = ''
    for (var k in newArgs) {
      string += '&' + k + '=' + newArgs[k]
    }
    string = string.substr(1)
    return string
  },

  // 钱方签名
  // signObj (data) {
  //   let sig = module.exports.raw(data)
  //   sig += qf.server_key
  //   sig = module.exports.md5(sig)
  //   data.sign = sig
  //   return data
  // },
  
  // 微信支付签名
  signWe (data) {
    let sig = module.exports.raw(data)
    sig += '&key=' + we.key
    sig = module.exports.md5(sig).toUpperCase()
    return sig
  },

  // 时间格式化
  dateformat (obj, format) {
    format = format || 'YYYY-MM-DD HH:mm:ss'
    if (process.env.NODE_ENV === 'test') {
      return obj
    }
    return moment(obj).format(format)
  },

  /**
 * 生成 API 返回数据
 * @param   res     response
 * @param   data    返回数据 （code===0:数据体, code>0:error message)
 * @param   code    Error Code (default: 0)
 * @param   status  Status Code (default: 200)
 */
  result (ctx, data, msg, status) {
    let redata = {}
    if (typeof data === 'string' ||
      data === 'null' ||
      data === undefined ||
      data === null || msg) {
      status = status || 400
      redata = {
        msg: data,
        data: {}
      }
    } else {
      status = status || 200
      redata = {
        msg: '',
        data: data
      }
    }
    ctx.status = status
    ctx.body = redata
    // ctx.status(status).send(redata)
  },

  isEmpty (value) {
    if (typeof value == 'string') {
      return value.trim() === ''
    } else if (typeof value == 'number') {
      return value === 0
    } else {
      return value === null || value === undefined
    }
  },

}
