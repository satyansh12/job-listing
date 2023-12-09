const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const getToken = payload => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY
  });
};

exports.login = catchAsync(async (req, res, next) => {
  // check if email and password are in the body'
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide a email and a password', 403));
  }

  //verify email and password
  const user = await User.findOne({ email });

  if (!user || !(await user.validatePassword(password, user.password))) {
    return next(new AppError('Email or password mismatch', 403));
  }

  // send token
  const token = getToken({ id: user._id });

  res.status(200).json({
    status: 'success',
    token: token
  });
});

exports.register = catchAsync(async (req, res, next) => {
  const { name, email, password, mobile } = req.body;
  const user = await User.create({ name, email, password, mobile });
  const token = getToken({ id: user._id });

  res.status(200).json({
    status: 'success',
    token: token,
    data: { user }
  });
});
