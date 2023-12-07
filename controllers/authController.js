exports.login = (req, res, next) => {
  res.status(200).json({
    status: 'success',
    message: 'Setup login route'
  });
};
