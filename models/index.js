const mongoose = require('mongoose')
const config   = require('../config')
const $        = require('../src/utils')
const v1       = require('./v1')

const dbname = config.isProd ? config.db : config.dbtest


module.exports =  {
  connect:  () => {
    mongoose.Promise = global.Promise
    mongoose.connect(dbname, {
      useMongoClient: true,
      server: { poolSize: 20 }
    }, (err) => {
      console.log(dbname)
      if (err) {
        console.log(`connect to ${dbname} error: ${err.message}`)
        process.exit(1)
      }
      return mongoose.connection
    })
  },
  v1,
}
