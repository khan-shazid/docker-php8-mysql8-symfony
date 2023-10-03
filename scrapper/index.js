const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const routes = require('./src/routes/index');

app.use('/', routes);

// catch 404 and forward to error handler
app.use( (req, res, next) => {
  next(createError(404, "Route not found!"));
});

// error handler
app.use( (err, req, res, next) => {
  // error response
  res.status(err.status || 500);
  res.send({
    success: false,
    message: err.message,
    errors: err
  });
});

const port = 4000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})