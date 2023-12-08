const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const cathcAsync = require('../utils/catchAsync');

exports.login = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Setup login route'
  });
};

exports.register = cathcAsync(async (req, res, next) => {
  const { name, email, password, mobile } = req.body;

  const user = await User.create({ name, email, password, mobile });

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});
