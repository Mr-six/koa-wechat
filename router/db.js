const Router = require('koa-router')
const db = new Router()
const { userApi, orderApi } = require('../src/db')

db.get('/test', orderApi)