// 微信扫码支付
  ### 模式一 优先生成二维码

  // 二维码中的内容为链接，形式为：
  // weixin：//wxpay/bizpayurl?sign=XXXXX&appid=XXXXX&mch_id=XXXXX&product_id=XXXXXX&time_stamp=XXXXXX&nonce_str=XXXXX

  // 公众账号ID	appid	String(32)	是	wx8888888888888888	微信分配的公众账号ID
  // 商户号	mch_id	String(32)	是	1900000109	微信支付分配的商户号
  // 时间戳	time_stamp	String(10)	是	1414488825	系统当前时间，定义规则详见时间戳
  // 随机字符串	nonce_str	String(32)	是	5K8264ILTKCH16CQ2502SI8ZNMTM67VS	随机字符串，不长于32位。推荐随机数生成算法
  // 商品ID	product_id	String(32)	是	88888	商户定义的商品id 或者订单号
  // 签名	sign	String(32)	是	C380BEC2BFD727A4B6845133519F3AD6	签名，详见签名生成算法

  // weixin：//wxpay/bizpayurl?appid=wx2421b1c4370ec43b&mch_id=10000100&nonce_str=f6808210402125e30663234f94c87a8c&product_id=1&time_stamp=1415949957&sign=512F68131DD251DA4A45DA79CC7EFE9D

  业务流程
  1, 根据不同商品 生成 商品id product_id (可用于统计) 结合时间戳 等生成签名 最后组合生成二维码
  2, 用户扫码后 微信支付系统 回调 用请求将带productid和用户的openid等参数 并要求商户系统返回交数据包 
  3, 商户后台系统收到微信支付系统的回调请求，根据productid生成商户系统的订单
  4, 商户系统调用微信支付【统一下单API】请求下单，获取交易会话标识（prepay_id）  
  5, 商户后台系统将prepay_id返回给微信支付系统  ---- 此步骤生成订单数据库
  6, 接口接受 响应回调 并更改 数据库订单结果

  ### 模式二 动态生成二维码

  直接调用统一下单接口实现
  
  <!-- 创建订单参数 -->  https://pay.weixin.qq.com/wiki/doc/api/native.php?chapter=9_1
  