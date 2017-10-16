/**
 * 基于joi的对象验证
 */
const $     = require('../src/utils')

/**
 * 用户信息验证
 * TODO 待完善全部验证
 */
const order  =        $.joi.object().keys({
  device_info:        $.joi.string().min(3).max(32).required(),           // 设备编号
  body:               $.joi.string().min(3).max(32).required(),           // 商品描述
  out_trade_no:       $.joi.string().min(3).max(32).required(),           // 商户订单
  total_fee:          $.joi.number().integer().required(),                // 标价金额 单位为分
  spbill_create_ip:   $.joi.string().ip({version: ['ipv4']}).required(),  // ip
  notify_url:         $.joi.string().min(3).max(256).required(),          // 通知地址
  trade_type:         $.joi.string().min(3).max(16).required(),           // 交易类型
  openid:              $.joi.string().min(3).max(32),                     // 微信用户的openid
  detail:             $.joi.string().min(3).max(6000),                    // 商品详情
  attach:             $.joi.string().min(3).max(127),                     // 附加数据
})

/**
 * 用户信息验证
 * TODO 待完善全部验证
 */
const user  = $.joi.object().keys({
  phone: {
    number: $.joi.string().regex(/^(0|86|17951)?(13[0-9]|14[579]|15[0-3,5-9]|17[0135678]|18[0-9])[0-9]{8}$/),
    hidden: $.joi.boolean(),
  },
  email: {
    addr:   $.joi.string().email(),
    hidden: $.joi.boolean(),
  },
  password: $.joi.string().min(8).max(30),
  nickname: $.joi.string().min(3).max(30),
})


module.exports = {
  order,
  user,
}