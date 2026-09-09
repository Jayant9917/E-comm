module.exports = (err, req, res, next) => {
  // pino-http includes this error in the request-completion log with the same request ID.
  res.err = err;
  if (res.headersSent) return next(err);
  const status = Number(err.status || err.statusCode);
  const statusCode = Number.isInteger(status) && status >= 400 && status <= 599 ? status : 500;
  res.status(statusCode).json({
    message: statusCode >= 500 ? 'Internal Server Error' : 'Invalid request',
    requestId: req.id,
  });
};
