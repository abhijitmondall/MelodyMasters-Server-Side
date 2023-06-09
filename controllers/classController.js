const Class = require('../models/classModel');
const ApiFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const getReqBodyData = (req) => {
  return {
    classImage: req.body.classImage,
    className: req.body.className,
    instructorName: req.body.instructorName,
    instructorEmail: req.body.instructorEmail,
    availableSeats: req.body.availableSeats,
    price: req.body.price,
    ratings: req.body.ratings,
    status: req.body.status,
  };
};

// Get All Classes With Query
exports.getAllClasses = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Class.find(), req.query)
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
  const Class = await Class.findById(req.params.id);

  if (!Class)
    return next(
      new AppError(`No Class found with this ID: ${req.params.id}`, 404)
    );

  res.status(200).json({
    status: 'success',
    Class,
  });
});

// Create Class
exports.createClass = catchAsync(async (req, res, next) => {
  const newClass = await Class.create(getReqBodyData(req));

  res.status(201).json({
    status: 'success',
    class: newClass,
  });
});

// Update Class
exports.updateClass = catchAsync(async (req, res, next) => {
  const Class = await Class.findByIdAndUpdate(
    req.params.id,
    getReqBodyData(req),
    {
      new: true,
      runValidators: true,
    }
  );

  if (!Class)
    return next(
      new AppError(`No Class found with this ID: ${req.params.id}`, 404)
    );

  res.status(200).json({
    status: 'success',
    Class,
  });
});

// Delete Class
exports.deleteClass = catchAsync(async (req, res, next) => {
  const Class = await Class.findByIdAndDelete(req.params.id);

  if (!Class) {
    return next(
      new AppError(`No Class found with this ID: ${req.params.id}`, 404)
    );
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});