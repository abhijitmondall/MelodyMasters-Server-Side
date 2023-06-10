const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'Please tell us your name!'],
  },

  email: {
    type: String,
    required: [true, 'Please tell us your email!'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email!'],
  },

  photo: {
    type: String,
  },

  gender: {
    type: String,
  },

  phoneNumber: {
    type: String,
  },

  address: {
    type: String,
  },

  role: {
    type: String,
    trim: true,
    enum: {
      values: ['student', 'instructor', 'admin'],
      message:
        'A Class must have a status either: (student, instructor, admin)!',
    },
    default: 'student',
  },

  classes: {
    type: Number,
    min: 0,
    default: 0,
  },

  students: {
    type: Number,
    min: 0,
    default: 0,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
