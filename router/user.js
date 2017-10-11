const Router      = require('koa-router')
const {authToken} = require('../src/utils/auth')
const {userApi}   = require('../src/db')
const user        = new Router()

/**
 * 登录逻辑
 */
user.post('/login', userApi.login)

/**
 * 注册逻辑
 */
user.post('/signup', userApi.create)

/**
 * 重置密码
 */
user.post('/resetPassword', userApi.resetPassword)


module.exports = user
