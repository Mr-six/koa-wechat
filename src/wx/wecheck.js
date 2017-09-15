/**
 * 微信服务器检查
 *
 */

const crypto = require('crypto')
const path = require('path')
const url = require('url')

const config = require('../../config') // 微信配置文件

// sha1加密
function sha1(str) {
  let shasum = crypto.createHash("sha1")
  shasum.update(str)
  str = shasum.digest("hex")
  return str
}

// 微信认证
function wechatCheck(ctx, next) {
  let query = url.parse(ctx.url, true).query
  let signature = query.signature
  let echostr = query.echostr
  let timestamp = query['timestamp']
  let nonce = query.nonce

  let reqArray = [nonce, timestamp, config.token]

  // 对数组进行字典排序
  reqArray.sort()
  let sortStr = reqArray.join('') //连接数组
  let sha1Str = sha1(sortStr)
  if (signature === sha1Str) {
    ctx.body = echostr
  } else {
    ctx.body = "false"
    console.log("授权失败!")
  }
}

module.exports = wechatCheck
