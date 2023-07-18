const { serialize } = require('cookie');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

// Set Cookie  Function...
module.exports.setCookie = (res, token, set) => {
  res.setHeader("Set-Cookie", serialize("token", set ? token : "", {
    path: '/',
    httpOnly: true,
    maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0,
  }));
}

//token genrate function..
module.exports.genrateToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET)
}

// check token and verify and return details of users.

module.exports.checkAuth = async (req) => {

  const cookie = req.headers.cookie;
  if (!cookie) return null;
  const token = cookie.split("=")[1];

  const decode = jwt.verify(token, process.env.JWT_SECRET)

  return await User.findById(decode._id);
};