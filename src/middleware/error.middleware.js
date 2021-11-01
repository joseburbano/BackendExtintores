module.exports = (err, req, res, next) => {
  const httpStatus = err.status || 500;

  return res.status(httpStatus).send({
    status: httpStatus,
    message: err.code || 404,
    message: err.message || "Internal Server error.",
  });
};
