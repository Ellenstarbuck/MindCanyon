function logger(req, res, next) {
  console.log(`Ìncoming ${req.method} to ${req.url}`)
  next()
}

module.exports = logger