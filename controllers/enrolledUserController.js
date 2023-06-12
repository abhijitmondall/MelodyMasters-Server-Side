const ApiFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const EnrolledUser = require('./../models/enrolledUserModel');

exports.getAllEnrolledUsers = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(EnrolledUser.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .search();

  const enrolledUsers = await features.query;

  res.status(200).json({
    status: 'success',
    results: enrolledUsers.length,
    data: {
      enrolledUsers,
    },
  });
});

exports.getEnrolledUser = catchAsync(async (req, res, next) => {
  const enrolledUser = await EnrolledUser.findById(req.params.id).select(
    '-__v'
  );

  if (!enrolledUser)
    return next(
      new AppError(`No User found with this ID: ${req.params.id}`, 404)
    );

  res.status(200).json({
    status: 'success',
    data: {
      enrolledUser,
    },
  });
});

exports.createEnrolledUser = catchAsync(async (req, res, next) => {
  const enrolledUser = await EnrolledUser.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      enrolledUser,
    },
  });
});

exports.updateEnrolledUser = catchAsync(async (req, res, next) => {
  const enrolledUser = await EnrolledUser.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!enrolledUser)
    return next(
      new AppError(`No User found with this ID: ${req.params.id}`, 404)
    );

  res.status(200).json({
    status: 'success',
    data: {
      enrolledUser,
    },
  });
});

exports.deleteEnrolledUser = catchAsync(async (req, res, next) => {
  const enrolledUser = await EnrolledUser.findByIdAndDelete(req.params.id);

  if (!enrolledUser)
    return next(
      new AppError(`No User found with this ID: ${req.params.id}`, 404)
    );

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
