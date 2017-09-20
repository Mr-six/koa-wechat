// const https = require('https')


const axios = require('axios')

const { we } = require('../../config')
const $ = require('../utils')

// const querystring = require('querystring')


class WeixinPayment {
  constructor(opts = {}) {
    this.$opts = opts
    this.$req = axios.create({
      baseURL: we.url,
      timeout: 1000*5,
      // httpsAgent: new https.Agent({
      //   pfx: opts.pfx
      // })
    })
  }

  sign(params) {
    const qs = Object.keys(params)
      .filter(key => key && params[key] && !['sign'].includes(key))
      .sort()
      .map(key => `${key}=${params[key]}`).join('&')
    return $.md5(qs).toUpperCase()
  }

  req(url, params) {
    const { appid, mch_id } = this.$opts
   
    Object.assign(params, {
      appid,
      mch_id,
      nonce_str: $.createNonceStr(),
    })

    // console.dir(params)
    
    params.sign = $.signWe(params)

    // console.log('签名： ' + params.sign)
    

    let body = $.j2x(params, { header: false })
    body = '<xml>' + body + '<\/xml>'
    // console.dir(body)
    
    return this.$req
      .post(url, body)
      .then(ret => $.x2j(ret.data))
  }

  createOrder(params = {}) {
    return this.req('/pay/unifiedorder', params)
  }

  queryOrder(params = {}) {
    return this.req('/pay/orderquery', params)
  }

  closeOrder(params = {}) {
    return this.req('/pay/closeorder', params)
  }

  reverseOrder(params = {}) {
    return this.req('/secapi/pay/reverse', params)
  }

  refund(params = {}) {
    return this.req('/secapi/pay/refund', params)
  }

  queryRefund(params = {}) {
    return this.req('/pay/refundquery', params)
  }

}

module.exports = WeixinPayment