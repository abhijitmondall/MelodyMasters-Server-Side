const ApiFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/userModel');

const getUserData = (req) => {
  return {
    name: req.body.name,
    email: req.body.email,
    photo: req.body.photo,
    gender: req.body.gender,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
  };
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .search();

  const users = await features.query;

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
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser)
    return res.status(200).json({ message: 'User already exists!' });

  const user = await User.create(getUserData(req));

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

exports.updateUserBasicInfo = catchAsync(async (req, res, next) => {
  const user = await User.findOneAndUpdate(
    { email: req.params.email },
    { classes: req.body.classes, students: req.body.students },
    {
      new: true,
      runValidators: true,
    }
  );

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

exports.getInstructors = catchAsync(async (req, res, next) => {
  const limitInstructors = parseInt(req.query.limit);

  let pipeline = [
    {
      $match: { role: 'Instructor' },
    },

    {
      $sort: { students: -1 },
    },

    {
      $project: {
        __v: 0,
      },
    },
  ];

  if (!isNaN(limitInstructors)) {
    pipeline.push({
      $limit: limitInstructors,
    });
  }

  const instructors = await User.aggregate(pipeline);

  res.status(200).json({
    status: 'success',
    results: instructors.length,
    instructors,
  });
});
