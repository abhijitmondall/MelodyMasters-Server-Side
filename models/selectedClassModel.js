const mongoose = require('mongoose');

const selectedClassSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },

  instructorEmail: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },

  classID: {
    type: String,
    required: true,
  },

  classImage: {
    type: String,
  },

  className: {
    type: String,
    index: true,
    trim: true,
    required: [true, 'A Class must have a className!'],
  },

  price: {
    type: Number,
    required: [true, 'A Class must have a price!'],
    min: 0,
  },

  status: {
    type: String,
    default: 'Selected',
    enum: ['Selected', 'Enrolled'],
  },

  enrolledStudents: {
    type: Number,
    min: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const SelectedClass = mongoose.model('SelectedClass', selectedClassSchema);

module.exports = SelectedClass;
