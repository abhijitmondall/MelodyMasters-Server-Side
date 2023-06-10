const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');
const AppError = require('../utils/appError');

const signToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.jwt = catchAsync(async (req, res, next) => {
  const { email } = req.params;

  // 2. Check if user exists
  const user = await User.findOne({ email });

  if (!email || !user) {
    return next(
      new AppError(
        'You don not have permission to perform this action!(Invalid Email/User)',
        403
      )
    );
  }

  // 3. If everything is ok, send token to the client
  const token = signToken(user.email);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protected = catchAsync(async (req, res, next) => {
  // 1. Getting token and check if it's exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access!', 401)
    );
  }

  // 2. Verify the token
  const { email } = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  console.log(email);
  // 3. Check if user still exists
  const currentUser = await User.findOne({ email });
  if (!currentUser) {
    return next(
      new AppError('The User belonging to this token no longer exists!', 401)
    );
  }

  // 4 Grand Access to protected route
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // Here Roles will be an Array
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You don not have permission to perform this action!', 403)
      );
    }

    next();
  };
};
