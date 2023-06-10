const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().select('-__v');
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-__v');

  if (!user)
    return next(
      new AppError(`No User found with this ID: ${req.params.id}`, 404)
    );

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user)
    return next(
      new AppError(`No User found with this ID: ${req.params.id}`, 404)
    );

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user)
    return next(
      new AppError(`No User found with this ID: ${req.params.id}`, 404)
    );

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
