const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
  classImage: {
    type: String,
  },

  className: {
    type: String,
    index: true,
    trim: true,
    required: [true, 'A Class must have a name!'],
  },

  instructorName: {
    type: String,
  },

  instructorEmail: {
    type: String,
  },

  availableSeats: {
    type: Number,
    required: [true, 'A Class must have a Seats!'],
    min: 0,
  },

  price: {
    type: Number,
    required: [true, 'A Class must have a price!'],
    min: 0,
  },

  ratings: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5,
  },

  status: {
    type: String,
    default: 'Pending',
    enum: {
      values: ['Pending', 'Approved', 'Draft'],
      message: 'A Class must have a status either: (Pending, Approved, Draft)!',
    },
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Class = mongoose.model('Class', classSchema);

module.exports = Class;
