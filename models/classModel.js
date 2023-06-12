const mongoose = require('mongoose');

const classSchema = new mongoose.Schema(
  {
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

    instructorPhoto: {
      type: String,
    },

    totalSeats: {
      type: Number,
      // required: [true, 'A Class must have a Seats!'],
      min: 0,
      default: 0,
    },

    // availableSeats: {
    //   type: Number,
    //   min: 0,
    // },

    enrolledStudents: {
      type: Number,
      min: 0,
      default: 0,
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
        values: ['Pending', 'Approved', 'Deny'],
        message:
          'A Class must have a status either: (Pending, Approved, Deny)!',
      },
    },

    feedback: {
      type: String,
      max: 255,
    },

    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual properties
// Calculate availableSeats and send to the end users
classSchema.virtual('availableSeats').get(function () {
  return this.totalSeats - this.enrolledStudents;
});

const MelodyClass = mongoose.model('MelodyClass', classSchema);

module.exports = MelodyClass;
