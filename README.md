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
