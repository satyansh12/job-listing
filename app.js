const express = require('express');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');
const userRouter = require('./routes/userRouter');

const app = express();

app.use(express.json());

app.get('/', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to the api 🎊'
  });
});

app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError('Route not found', 404));
});

app.use(globalErrorHandler);

module.exports = app;
