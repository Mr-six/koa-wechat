const {productModel} = require('../../models').v1
const $         = require('../utils')
const Base      = require('./base')
const {schema}  = require('../../config')

let productAPI = new Base({
  model: productModel,
  search: 'title',
})

productAPI.methods.all = async function (ctx, next) {
  let query = {}, search = ctx.query.search, device_info = ctx.query.device_info
  if (!$.isEmpty(search)) {
    query = { 'title': new RegExp(search) }
  } else {
    query = { 'device_info': new RegExp(device_info) }
  }
  let documents = await productModel.all(query, ctx.query.start)
  $.result(ctx, documents)
}



productAPI.methods.create = async function (ctx, next) {
  let body = ctx.request.body
  
  const query = Object.assign({}, body)
  // $.info(query)
  let article = await productModel.create(query)

  // $.debug(article)
  $.result(ctx, article)
}

productAPI.methods.findById = async function (ctx) {
  let id = ctx.query.id
  
  if (!id) return $.result(ctx, 'no id')
  // $.info(query)
  let res = await productModel.findById(id)

  // $.debug(article)
  $.result(ctx, res)
}



module.exports = productAPI.methods
