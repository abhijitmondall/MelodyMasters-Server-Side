const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

console.log(process.env.NODE_ENV);

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

// app.use(globalErrorHandler);

module.exports = app;
