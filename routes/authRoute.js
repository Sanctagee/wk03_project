const express = require('express');
const router = express.Router();
const passport = require('passport');
const { getProfile, logout } = require('../controllers/authController');

// kicks off the Google login flow
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google sends the user back here after they approve
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failed' }),
  (req, res) => {
    res.redirect('/auth/profile');
  }
);

// shows the logged-in user's profile
router.get('/profile', getProfile);

// logs out and destroys the session
router.get('/logout', logout);

// fallback if Google login fails
router.get('/failed', (req, res) => {
  res.status(401).json({ error: 'Google login did not work. Please try again.' });
});

module.exports = router;