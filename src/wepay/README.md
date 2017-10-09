## 扫码支付
### 模式一 优先生成二维码(固定二维码模式)
模式一不适合多设备的情况：
参数只有product_id可选，对于多台设备，和多商品，在价格和设备编号判断上存在不便。


### 模式二 动态生成二维码
适合有屏幕的设备根据商品动态生成二维码 有效期为两个小时 不适合做固定支付

## h5 支付
由页面动态生成二维码，操作灵活。
方便接入其他支付方式


### 接口 post /wepay/create
微信统一下单：
```
/**
 * post 参数
 * device_info 设备编号　最多　20 位字符串
 * total_fee　商品价格　单位　分
 * body　商品名称
 * trade_type: 'NATIVE', // 扫码支付类型 h5支付:MWEB 
 * detail　商品详情　(可省略)
 * attach：备注信息（可省略）
 */
```

### 订单支付状态查询 get /wepay/findone 
/**
 * get 参数　out_trade_no　或者　transaction_id　二选一
 * 返回结果 trade_state 为　NOTPAY　或者　SUCCESS
 */

### 订单列表查询 get /wepay/orderlist
/**
 * get 参数　{query 对象　根据订单参数进行筛选}
 * 如 设备编号 价格 商品名词等 为空则查看全部
 */