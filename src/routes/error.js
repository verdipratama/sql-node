export function catch404(req, res, next) {
  next(404);
}

export function errorHandler(err, req, res, next) {
  return res.status(err.statusCode || 404).json({
    status: false,
    data: null,
    message: err.message || 'Resources Not Found',
  });
}
