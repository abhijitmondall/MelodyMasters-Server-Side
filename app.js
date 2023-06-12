const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');
const classRouter = require('./routes/classRoutes');
const selectedClassRouter = require('./routes/selectedClassRoutes');
const paymentIntentRouter = require('./routes/paymentIntentRoutes');
const enrolledUserRouter = require('./routes/enrolledUserRoutes');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

console.log(process.env.NODE_ENV);

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());

// Users Route
app.use('/api/v1/users', userRouter);

// Classes Route
app.use('/api/v1/classes', classRouter);

// Selected Classes Route
app.use('/api/v1/selectedClasses', selectedClassRouter);

// Payment Intent Route
app.use('/api/v1/create-payment-intent', paymentIntentRouter);

// Enrolled User Route
app.use('/api/v1/enrolledUsers', enrolledUserRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

// Global Error Handler Middleware
app.use(globalErrorHandler);

module.exports = app;
