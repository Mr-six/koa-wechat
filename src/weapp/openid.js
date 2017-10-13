const axios = require('axios')
const {we} = require('../../config')

module.exports = async function (ctx) {
    let query = ctx.query
    console.log(query)
    if (query.code) {
        let code = query.code
        let {appid_app, appsecret_app} = we
        let target = 'https://api.weixin.qq.com/sns/jscode2session?appid='
            + appid_app +
            '&secret='
            + appsecret_app +
            '&js_code='
            + code +
            '&grant_type=authorization_code'
        let {data} = await axios.get(target)
        console.log(data)
        ctx.body = data.openid
    }
}