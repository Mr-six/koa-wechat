## 基于 koa 开发的微信后端 api
使用 [co-wechat-api](https://github.com/node-webot/co-wechat-api) 框架构建基础 api<br>
使用 koa-router 做请求的路由<br>

api 列表：<br>
get /wx/wecheck  根据 config 文件中的 token 验证服务器 用于配置服务器<br>
get /wx/getTicket  获取 ticket<br>
get /wx/getJsConfig  参数：<br>
`{debug: false, jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage'], url: 'http://www.xxx.com'}`
返回获取 js SDK 调用时所需参数 返回实例：<br>
```
{
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，公众号的唯一标识
    timestamp: , // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名，见附录1
    jsApiList: [] // 必填，需要使用的JS接口列表
    }
```

## 扫码支付
### 模式一 优先生成二维码(固定二维码模式)
模式一不适合多设备的情况：
参数只有product_id可选，对于多台设备，和多商品，在价格和设备编号判断上存在不便。


### 模式二 动态生成二维码
适合有屏幕的设备根据商品动态生成二维码 有效期为两个小时 不适合做固定支付

## h5 支付
由页面动态生成二维码，操作灵活。
方便接入其他支付方式

## 微信小程序
适合应用开发，需要开发自己的支付充值，也可简单支付，但只限于微信


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
```
/**
 * get 参数　out_trade_no　或者　transaction_id　二选一
 * 返回结果 trade_state 为　NOTPAY　或者　SUCCESS
 */
```
### 订单列表查询 get /wepay/orderlist
```
/**
 * get 参数　{query 对象　根据订单参数进行筛选}
 * 如 设备编号 价格 商品名词等 为空则查看全部
 */
 ```
### 商品创建 post /wepay/creatProd
```
/**
 * post 参数　{body 对象　根据订单参数进行筛选}
 * device_info:    设备名称或者商品名称 编号
 * title:          商品标题
 * subtitle:       商品副标题
 * pic:            商品图片
 * price:          单价
 */
```

### 根据商品id查找 get /wepay/findProductByid
```
/**
 * get 参数　{query 对象}
 * id     商品id
 */
```

### 按类查询商品 get /wepay/findProduct
```
/**
 * get 参数　{query 对象}
 * title     商品名称 或者 device_info 二选一, 优先使用 title
 */
```

### 更新商品信息 post /wepay/updateProd/:id
```
/**
 * id 为目标的id
 * 修改信息参数 参考创建时所使用的参数
 */
```

### 删除商品信息 post /wepay/deleteProd/:id
```
/**
 * id 为目标的id
 */
```