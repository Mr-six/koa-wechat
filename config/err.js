/**
 * 错误代码
 */

function errMsg (msg) {
  return {
    success: false,
    msg: msg,
    errCode: 10001  // 错误代码待定
  }
}

module.exports = {
  err_param () {
    return errMsg ('参数错误')
  },
  err_defult() {
    return errMsg ('err')
  }
}
