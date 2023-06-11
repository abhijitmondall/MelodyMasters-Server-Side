const mongoose = require('mongoose');

const selectedClassSchema = new mongoose.Schema({
  email: {
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
    required: [true, 'A Class must have a name!'],
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

  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const SelectedClass = mongoose.model('SelectedClass', selectedClassSchema);

module.exports = SelectedClass;
