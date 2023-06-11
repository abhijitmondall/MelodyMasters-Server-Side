const ApiFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const SelectedClass = require('./../models/selectedClassModel');

exports.getAllSelectedClasses = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(SelectedClass.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate()
    .search();

  const selectedClasses = await features.query;

  res.status(200).json({
    status: 'success',
    results: selectedClasses.length,
    selectedClasses,
  });
});

// Get Class By IDs
exports.getSelectedClass = catchAsync(async (req, res, next) => {
  const selectedClass = await SelectedClass.findById(req.params.id).select(
    '-__v'
  );

  if (!selectedClass)
    return next(
      new AppError(`No Class found with this ID: ${req.params.id}`, 404)
    );

  res.status(200).json({
    status: 'success',
    selectedClass,
  });
});

// Create Class
exports.createSelectedClass = catchAsync(async (req, res, next) => {
  const newClass = await SelectedClass.create(req.body);

  res.status(201).json({
    status: 'success',
    selectedClass: newClass,
  });
});

// Update Class
exports.updateSelectedClass = catchAsync(async (req, res, next) => {
  const selectedClass = await SelectedClass.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!selectedClass)
    return next(
      new AppError(`No Class found with this ID: ${req.params.id}`, 404)
    );

  res.status(200).json({
    status: 'success',
    selectedClass,
  });
});

// Delete Class
exports.deleteSelectedClass = catchAsync(async (req, res, next) => {
  const selectedClass = await SelectedClass.findByIdAndDelete(req.params.id);

  if (!selectedClass) {
    return next(
      new AppError(`No Class found with this ID: ${req.params.id}`, 404)
    );
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
