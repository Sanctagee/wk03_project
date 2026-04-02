// blocks access if the user is not logged in
const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({
    error: 'You need to log in first to do that.',
    hint: 'Visit /auth/google to sign in'
  });
};

module.exports = isAuthenticated;