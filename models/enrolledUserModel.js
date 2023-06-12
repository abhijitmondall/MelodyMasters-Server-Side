const mongoose = require('mongoose');
const validator = require('validator');

const enrolledUserSchema = new mongoose.Schema({
  userName: {
    type: String,
    trim: true,
  },

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

  transactionId: {
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

  enrolledStudents: {
    type: Number,
    min: 0,
  },

  status: {
    type: String,
    default: 'Paid',
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    // select: false,
  },
});

const EnrolledUser = mongoose.model('EnrolledUser', enrolledUserSchema);

module.exports = EnrolledUser;
