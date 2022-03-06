const res = require("express/lib/response")

module.exports = function (req, rest, next) {
  if (!req.user.isAdmin) return res.status(403).send('Access denied.');
  next();
}