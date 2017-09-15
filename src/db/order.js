const {orderModel} = require('../../models').v1
const $         = require('../utils')
const Base      = require('./base')
const {schema}  = require('../../config')

let orderAPI = new Base({
  model: orderModel,
  search: 'title',
})

orderAPI.methods.all = async function (ctx, next) {
  let query = {}, search = ctx.query.search
  if (!$.isEmpty(search)) query = { 'title': new RegExp(search) }
  let documents = await orderModel.all(query, ctx.query.start)
  $.result(ctx, documents)
}

// orderAPI.methods.create = orderAPI.methods.addSchedule

// // 更改索引
// orderAPI.methods.updateIndex = async function (ctx, next) {
//   if (req.body.items.length === 0) return $.result(ctx, {})
//   else req.body.items.forEach(async (el, index) => {
//     let documents = await orderModel.update({
//       _id: el.id
//     }, { _index: el.index })
//     if (index === req.body.items.length - 1) { return $.result(ctx, {}) }
//   })
// }
orderAPI.methods.create = async function (ctx, next) {
  let body = ctx.request.body
  const { error, value } = $.joi.validate(body, schema.article)  // 验证body对象
  $.debug(error)
  if (error) return $.result(ctx, 'params error')
  
  const query = Object.assign({}, body)
  $.info(query)
  let article = await orderModel.create(query)

  $.debug(article)
  $.result(ctx, article)
}

// orderAPI.methods.delete = async function (ctx, next) {
//   let documents = await orderModel.findById(req.params.id)
//   documents && documents.job && documents.job.cancel()
//   documents = await orderModel.delete({ "_id": req.params.id })
//   if (documents === -1) $.result(ctx, 'delete failed')
//   else $.result(ctx, documents)
// }

orderAPI.methods.test = async function (data) {
  return orderModel.findOne()
}
module.exports = orderAPI.methods
