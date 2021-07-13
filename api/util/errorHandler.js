const HTTP_SERVER_ERROR = 500
function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  return res.status(err.status || HTTP_SERVER_ERROR).send(err.message?err.message:err)
}
module.exports = errorHandler