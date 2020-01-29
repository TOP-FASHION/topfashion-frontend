module.exports = () => {
  return (req, res, next) => {
    if (req.method !== 'GET') {
      res.redirect(req.originalUrl)
      return
    }

    next()
  }
}
