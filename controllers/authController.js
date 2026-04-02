const getProfile = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ error: 'Not logged in.' });
  }
  res.status(200).json({
    loggedIn: true,
    user: {
      id: req.user._id,
      name: req.user.displayName,
      email: req.user.email,
      photo: req.user.photo
    }
  });
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed.' });
    }
    req.session.destroy(() => {
      res.status(200).json({ message: 'You have been logged out.' });
    });
  });
};

module.exports = { getProfile, logout };