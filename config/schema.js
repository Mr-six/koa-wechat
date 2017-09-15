/**
 * 基于joi的对象验证
 */
const $     = require('../src/utils')

/**
 * 用户信息验证
 * TODO 待完善全部验证
 */
const order  =         $.joi.object().keys({
  device_info:        $.joi.string().min(3).max(32).required(),           // 设备编号
  body:               $.joi.string().min(3).max(32).required(),           // 商品描述
  out_trade_no:       $.joi.string().min(3).max(32).required(),           // 商户订单
  total_fee:          $.joi.number().integer().required(),                // 标价金额 单位为分
  spbill_create_ip:   $.joi.string().ip({version: ['ipv4']}).required(),  // ip
  notify_url:         $.joi.string().min(3).max(256).required(),         // 通知地址
  trade_type:         $.joi.string().min(3).max(16).required(),           // 交易类型

  detail:             $.joi.string().min(3).max(6000),                    // 商品详情
  attach:             $.joi.string().min(3).max(127),                     // 附加数据
    
})

/**
 * 文章信息验证
 */
const article = $.joi.object().keys({
  title:     $.joi.string(),
  user:      $.joi.string(),
  content:   $.joi.string().empty(''),
  markdown:  $.joi.string().empty(''),
  html:      $.joi.string().empty(''),
  subTitle:  $.joi.string().empty(''),
  headerImg: $.joi.string().empty(''),
  status:    $.joi.string(),
  sendAt:    $.joi.date().empty(''),
})

module.exports = {
  order,
  article,
}