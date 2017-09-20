async function createO (body) {
  // ip　判断
  let regip = /(25[0-5]|2[0-4]\d|[0-1]?\d?\d)(\.(25[0-5]|2[0-4]\d|[0-1]?\d?\d)){3}/
  let ip = ctx.request.ip
  if (ip.match(regip)) {
    ip = ip.match(regip)[0]
  } else {
    ip = '192.168.0.1'
  }

  let extra = body.product_id ?
  {out_trade_no: body.product_id +　'-' + $.createTimestamp()}
  :
  {out_trade_no: body.device_info +　'-' + $.createTimestamp()} 

  Object.assign(body, extra, {
    spbill_create_ip: ip,
    notify_url: we.notify_url,
  })
  return body
}

module.exports = createO