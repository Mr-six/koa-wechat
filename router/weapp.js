const Router = require('koa-router')
const weapp = new Router()
const waappApi = require('../src/weapp')

weapp.get('/openid', waappApi.openid)

module.exports = weapp

