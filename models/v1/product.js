const Base = require('../base')

const product = new Base('product', {
  // user:      { type: Base.ObjectId(), ref: 'User' },
  device_info:        String,  // 设备名称或者商品名称 编号
  title:              String,  // 商品标题
  subtitle:           String,  // 商品副标题
  pic:                String,  // 商品图片
  price:              Number,  // 单价
  _index:             { type: Number, default: 0, index: true }
})

product.methods.create = async function (query) {
  query._index = await this.count({}) + 1
  return await product.create(query)
}

module.exports = product.methods


