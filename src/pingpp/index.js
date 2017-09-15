const api = require('./api')
const { ping } = require('../../config')
module.exports = {

  /**
   * 创建订单逻辑
   * @param {koa} ctx 
   */
  async create (ctx) {
    let data = ctx.request.body
    if (!data) return false
    // 微信判断 product_id
    if (data.__type === 'wechat' && data.extra && !data.extra.product_id) return false

    let ip = ctx.ip.match(/\d+.\d+.\d+.\d+/) ? ctx.ip : '127.0.0.1'
    // 添加 id 和　ip
    data.app = {id: ping.app_id}
    data.client_ip = ip

    try {
      let res = await api.create(data)
      ctx.body = res
    } catch (e) {
      console.log(e)
    }
  },
  
  /**
   * 订单查询
   * @param {koa} ctx 
   */
  async findOne (ctx) {
    let {id} = ctx.query
    if (!id) return false
    try {
      let res = await api.retrieve(id)
      ctx.body = res
    } catch (e) {
      console.dir(e)
      ctx.body = e.message
    }
  },
}