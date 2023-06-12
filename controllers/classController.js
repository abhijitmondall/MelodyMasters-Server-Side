const MelodyClass = require('../models/classModel');
const ApiFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const getReqBodyData = (req) => {
  return {
    classImage: req.body.classImage,
    className: req.body.className,
    instructorName: req.body.instructorName,
    instructorEmail: req.body.instructorEmail,
    instructorPhoto: req.body.instructorPhoto,
    totalSeats: req.body.totalSeats,
    availableSeats: req.body.availableSeats,
    enrolledStudents: req.body.enrolledStudents,
    price: req.body.price,
    ratings: req.body.ratings,
    status: req.body.status,
  };
};

// Get All Classes With Query
exports.getAllClasses = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(MelodyClass.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .search();

  const classes = await features.query;

  res.status(200).json({
    status: 'success',
    results: classes.length,
    classes,
  });
});

// Get Class By IDs
exports.getClass = catchAsync(async (req, res, next) => {
  const melodyClass = await MelodyClass.findById(req.params.id).select('-__v');

  if (!melodyClass)
    return next(
      new AppError(`No Class found with this ID: ${req.params.id}`, 404)
    );

  res.status(200).json({
    status: 'success',
    class: melodyClass,
  });
});

// Create Class
exports.createClass = catchAsync(async (req, res, next) => {
  const newClass = await MelodyClass.create(getReqBodyData(req));

  res.status(201).json({
    status: 'success',
    class: newClass,
  });
});

// Update Class
exports.updateClass = catchAsync(async (req, res, next) => {
  const melodyClass = await MelodyClass.findByIdAndUpdate(
    req.params.id,
    getReqBodyData(req),
    {
      new: true,
      runValidators: true,
    }
  );

  if (!melodyClass)
    return next(
      new AppError(`No Class found with this ID: ${req.params.id}`, 404)
    );

  res.status(200).json({
    status: 'success',
    class: melodyClass,
  });
});

// Delete Class
exports.deleteClass = catchAsync(async (req, res, next) => {
  const melodyClass = await MelodyClass.findByIdAndDelete(req.params.id);

  if (!melodyClass) {
    return next(
      new AppError(`No Class found with this ID: ${req.params.id}`, 404)
    );
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
